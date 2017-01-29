import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import { Button } from 'react-native-material-design';

import Auth from '../libs/auth';
import styles from './styles/login.js';

class LoginPage extends Component {
  constructor () {
    super();

    this.state = {
      isLoggedIn: false,
      authCallbackIndex: null
    };
  }

  componentDidMount () {
    let self = this;

    let index = Auth.onAuth((user) => {
      if (user) {
        self.setState({isLoggedIn: true});
      } else {
        self.setState({isLoggedIn: false});
      }
    });

    this.setState({
      authCallbackIndex: index
    });
  }

  componentWillUnmount () {
    Auth.removeCallback('auth', this.state.index);
  }

  render () {
    let text = 'Mon compte';
    let button;

    if (this.state.isLoggedIn) {
      text = Auth.getUser().name;
      button = (
        // Button logout sa mère
        <Button
          value='Se déconnecter'
          text='Se déconnecter'
          raised
          onPress={Auth.signOut} />
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
