import Exponent from 'exponent';
import firebase from 'firebase';
//import 'isomorphic-fetch';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import FacebookButton from '../FacebookButton';

export default class Login extends Component {

  componentDidMount() {
    firebase.auth().signOut();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('BundleList');
      }
    });
  }

  authenticate = (token) => {
    const provider = firebase.auth.FacebookAuthProvider;
    const credential = provider.credential(token);
    return firebase.auth().signInWithCredential(credential);
  }

  createUser = (uid, userData) => {
    firebase.database().ref('users').child(uid).update(userData)
  }

  login = async () => {
    const ADD_ID = '617675415102341';
    const options = {
      permissions: ['public_profile', 'user_birthday', 'user_work_history']
    };
    const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(ADD_ID, options);

    if (type === 'success') {
      const fields = [
        'id',
        'first_name',
        'last_name',
        'gender',
        'birthday',
        'work'
      ];
      const response = await fetch(`https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`);
      const userData = await response.json();
      const { uid } = await this.authenticate(token);
      this.createUser(uid, userData);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FacebookButton
          onPress={this.login}
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
