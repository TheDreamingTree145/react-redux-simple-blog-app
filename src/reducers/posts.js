import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index';

// Where is our create_post case?
// For fetch post wouldn't we possible be adding identical records?

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      const post = action.payload.data;
      return { ...state, [post.id]: post };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    case DELETE_POST:
      // Look at the state object and if there is a key with the id remove it
      return _.omit(state, action.payload)
    default:
      return state;
  }
}

// mapKeys from lodash takes an object and turns it into an object with
// keys that are the 2nd argument
