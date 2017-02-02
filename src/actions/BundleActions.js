import firebase from 'firebase';
import { BUNDLE_FETCH_SUCCESS,
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
