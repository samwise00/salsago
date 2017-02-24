import {
  EVENTS_FETCH
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENTS_FETCH:
      console.log(action);
      return state;
    default:
      return state;
  }
};
