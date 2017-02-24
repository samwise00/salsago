
/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, { Component } from 'react';
import ReactNative from 'react-native';

import { ListItem } from '../common';

const firebase = require('firebase');

const {
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = ReactNative;

// Initialize Firebas

class TestFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
  }

  componentDidMount() {
    const boob = firebase.database().ref('/events/ADC/Title');
    console.log(boob)
    this.listenForItems(this.itemsRef);
  }

  getRef() {
    return firebase.database().ref('/events');
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      const items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  _renderItem(item) {
    const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          { text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove() },
          { text: 'Cancel', onPress: (text) => console.log('Cancelled') }
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
        />
      </View>
    )
  }
}

export default TestFeed;
