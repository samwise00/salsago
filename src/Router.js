import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import BundleList from './components/BundleList';
import BeginnerBundle from './components/BeginnerBundle';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="main">
        <Scene
          rightTitle="Points"
          key="bundleList"
          component={BundleList}
          title="Bundles"
          initial
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
