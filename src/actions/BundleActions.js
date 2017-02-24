import firebase from 'firebase';
import { BUNDLE_FETCH_SUCCESS, EVENTS_FETCH
} from './types';

export const bundleFetch = () => {
  return (dispatch) => {
    console.log(firebase.database().ref('/bundles'));
    //console.log(firebase.database().ref('Bundles'))
    firebase.database().ref('/bundles')
      .on('value', snapshot => { // any time any data comes from this bucket, call snapshot function
        dispatch({ type: BUNDLE_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeesFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/events')
      .on('value', snapshot => {
        dispatch({ type: EVENTS_FETCH, payload: snapshot.val() });
      });
  };
};
