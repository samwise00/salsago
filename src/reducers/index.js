import { combineReducers } from 'redux';
import BundleReducer from './BundleReducer';

export default combineReducers({
  bundle: BundleReducer, // auth piece of state is produced by the AuthReducer
});
