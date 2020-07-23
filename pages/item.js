import view from '../utils/view.js';
import Story from '../components/Story.js'
import Comment from '../components/Comment.js'

export default  async function Item() {
    let story =null;
    let hasError =false;
    let hasComments = false;
    try {
         story = await getStory();
         hasComments = story.comments.length > 0;
    } catch(error) {
        hasError = true;
        console.error(error);
    }
  if(hasError) {
      view.innerHTML = `<div class="error"> Error Fetching Story</div>`;
  }
    view.innerHTML= `<div>
    ${Story(story)}
    </div>
    <hr/>
    ${hasComments ? story.comments.map(comment => Comment(comment)).join(''): 'No Comments'};
    
    `;
}

async function getStory() {
   const storyId = window.location.hash.split('?id=')[1];
   console.log(storyId);

  const response =  await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`);
  const story = await response.json();
  return story;
}
