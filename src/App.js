import firebase from 'firebase';
import { StackNavigator, TabNavigator } from 'react-navigation';
import BundleList from './components/screens/BundleList';
import BeginnerBundle from './components/screens/BeginnerBundle';
import MusicPlayground from './components/screens/MusicPlayground';
import MusicPlayer from './components/screens/MusicPlayer';
import NewsFeed from './components/screens/NewsFeed';
import Store from './components/screens/Store';

const config = {
  apiKey: 'AIzaSyBsyzEPal5l1tbfGvwT5KggArPBr440CN0',
  authDomain: 'salsago-d79b9.firebaseapp.com',
  databaseURL: 'https://salsago-d79b9.firebaseio.com',
  storageBucket: 'salsago-d79b9.appspot.com',
  messagingSenderId: '454422164264'
};

firebase.initializeApp(config);

const HomeNav = StackNavigator({
  BundleListScreen: { screen: BundleList },
  BeginnerBundleScreen: { screen: BeginnerBundle }
});

const MusicNav = StackNavigator({
  MusicPlayground: { screen: MusicPlayground }
});

const MusicPlayerNav = StackNavigator({
  MusicPlayer: { screen: MusicPlayer }
});

const NewsFeedNav = StackNavigator({
  NewsFeed: { screen: NewsFeed }
});

const StoreNav = StackNavigator({
  Store: { screen: Store }
});

const TabNav = TabNavigator({
  Home: { screen: HomeNav },
  Music: { screen: MusicNav },
  Listen: { screen: MusicPlayerNav },
  NewsFeed: { screen: NewsFeedNav },
  Store: { screen: StoreNav }
}, {
  tabBarOptions: {
    activeTintColor: '#424242',
    showLabel: true,
    style: {
      backgroundColor: '#F8E0E6',
    }
}

});

export default TabNav;
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
