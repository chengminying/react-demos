import { SELECT_FILTER } from './actionTypes';
import { filterTypes } from './filterTypes';

export default (state = filterTypes.ALL, action) => {
  switch (action.type) {

    case SELECT_FILTER:
    console.log(action);
    
      return action.filter;
    default:
      return state
  }
}
