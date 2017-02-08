import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import BundleList from './components/screens/BundleList';
import BeginnerBundle from './components/screens/BeginnerBundle';
import Login from './components/screens/Login';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="main">
        <Scene
          key="login"
          component={Login}
          title="Login"
          initial
        />
      </Scene>
      <Scene key="app">
        <Scene
          rightTitle="Points"
          key="bundleList"
          component={BundleList}
          title="Bundles"
        />
        <Scene
          key="beginnerBundle"
          component={BeginnerBundle}
          title="Beginner"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
