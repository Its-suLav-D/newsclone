import view from '../utils/view.js';
import Story from '../components/Story.js';
import store from '../store.js';
import checkFavorite from '../utils/checkFavorite.js';

export default async function Stories(path) {
   
   const {favorites} = store.getState();
   console.log(favorites);
   const stories = await getStories(path);
   const hasStories = stories.length > 0;
    view.innerHTML= `<div>
    ${hasStories ? stories.map((story, i) => Story({...story, index: i + 1, isFavorite: 
        checkFavorite(favorites, story) })).join('') : 
    'No Stories Try reloadiing...'}
    </div>`;

    document.querySelectorAll('.favorite').forEach(item => {
        item.addEventListener('click', async function() {
           const story =  JSON.parse(this.dataset.story);
           const isFavorited = checkFavorite(favorites, story);
           store.dispatch({ type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE", payload: { favorite: story } })  
           await Stories(path);
        });
    });
}

async function getStories(path) {
    const isHomeRoute = path === '/'; 
    const isNewRoute = path === '/new';
    const isJobRoute = path === '/job';
    if (isHomeRoute) {
        path = '/news';
    } else if(isNewRoute) {
        path ='/newest';
    } else if(isJobRoute) {
        path ='/jobs'; 
    }
   const response = await fetch(`https://node-hnapi.herokuapp.com${path}`);
   const stories = await response.json();
   return stories; 
}