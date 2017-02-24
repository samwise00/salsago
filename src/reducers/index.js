import { combineReducers } from 'redux';
import BundleReducer from './BundleReducer';
import EventReducer from './EventReducer';

export default combineReducers({
  bundle: BundleReducer, // auth piece of state is produced by the AuthReducer
  eventData: EventReducer
});
