import {
  BUNDLE_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  beginner: '',
  intermediate: '',
  advanced: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUNDLE_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
