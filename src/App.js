import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBsyzEPal5l1tbfGvwT5KggArPBr440CN0',
      authDomain: 'salsago-d79b9.firebaseapp.com',
      databaseURL: 'https://salsago-d79b9.firebaseio.com',
      storageBucket: 'salsago-d79b9.appspot.com',
      messagingSenderId: '454422164264'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextReducer = './reducers/index';
        store.replaceReducer(nextReducer);
      });
    }
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
