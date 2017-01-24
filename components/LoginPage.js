import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import Auth from '../libs/auth';

import styles from './styles/login.js';

class LoginPage extends Component {
  constructor () {
    super();

    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount () {
    let self = this;

    Auth.onAuth((user) => {
      if (user) {
        self.setState({isLoggedIn: true});
      } else {
        self.setState({isLoggedIn: false});
      }
    });
  }

  render () {
    let text = 'Mon compte';
    let button;

    if (this.state.isLoggedIn) {
      text = Auth.getUser().name;
      button = (
        // Button logout sa mère
        // <Button
        //   title='Se déconnecter'
        //   onPress={Auth.signOut} />
        <Text>Nique sa mère le maire</Text>
      );
    } else {
      button = (
        <GoogleSigninButton
          style={{width: 312, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={Auth.signIn} />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {text}
        </Text>
        {button}
      </View>
    );
  }
}

module.exports = LoginPage;
