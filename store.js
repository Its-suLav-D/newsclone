function createStore(reducer) {
    // undefined = initialState is going to be applied when it is undefined. 
   let currentState =  reducer(undefined, {});
   
   return {
       // Method that returns the current state 
       getState: () => currentState, 
       // It passes our action to reducer. 
       dispatch: action => {
           // currentState updates the new state with the previous value. 
          currentState = reducer(currentState, action);
       }
   } 
}
    // States managed by reducers are always almost Object in serious application
const initialState = {
    favorites: []
}
// State takes Previous State and Actions determines what to do with the state. 
function favoritesReducer(state = initialState, action) {
    switch(action.type) {
        case "ADD_FAVORITE": {
            const addedFavorite = action.payload.favorite;
            // Copy state updates immutability we use spread operator. 
            const favorites =[...state.favorites, addedFavorite];
            return { favorites}; 
        }
        case "REMOVE_FAVORITE": {
            const removedFavorite = action.payload.favorite;
            const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id);
            return {favorites};
        }

        default:
            return state;
    } 
}

// const action = {type: "ADD_FAVORITE", payload: { favorite:{title: "story1", id=1} }}
// To add anything in addition to action we need payload. 
// payload provides data for us and is often object. 
const store = createStore(favoritesReducer); 

export default store; 