import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import FacebookButton from '../FacebookButton';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FacebookButton
          onPress={() => this.props.navigation.navigate('BundleList')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
