//import React, { Component } from 'react';
//import { Provider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
//import ReduxThunk from 'redux-thunk';
//import reducers from './reducers';
//import Router from './Router';
import Login from './components/screens/Login';
import BundleList from './components/screens/BundleList';
import BeginnerBundle from './components/screens/BeginnerBundle';

const config = {
  apiKey: 'AIzaSyBsyzEPal5l1tbfGvwT5KggArPBr440CN0',
  authDomain: 'salsago-d79b9.firebaseapp.com',
  databaseURL: 'https://salsago-d79b9.firebaseio.com',
  storageBucket: 'salsago-d79b9.appspot.com',
  messagingSenderId: '454422164264'
};

firebase.initializeApp(config);

const RouteConfigs = {
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  BundleList: {
    screen: BundleList,
    navigationOptions: {
      title: 'Bundles'
    }
  },
  BeginnerBundle: {
    screen: BeginnerBundle,
    navigationOptions: {
      title: 'Beginner Bundle'
    }
  }
};

const StackNavigatorConfig = {
  headerMode: 'float'
};

export default StackNavigator(RouteConfigs, StackNavigatorConfig);
/* {
  componentWillMount() {

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
*/
