import _ from 'lodash';
import { FETCH_POSTS } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}

// mapKeys from lodash takes an array and turns it into an object with
// keys that are the 2nd argument
