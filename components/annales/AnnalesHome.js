import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import {GoogleSigninButton} from 'react-native-google-signin';
import Auth from '../../libs/auth';

import styles from '../styles/events.js';

class AnnalesHome extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Bienvenue dans les annales
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <GoogleSigninButton
          style={{width: 48, height: 48}}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={Auth.signIn} />
      </View>
    );
  }
}

module.exports = AnnalesHome;
