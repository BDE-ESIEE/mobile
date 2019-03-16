import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GoogleSigninButton } from 'react-native-google-signin';
import { Button } from 'react-native-material-design';
import Barcode from 'react-native-barcode-builder';

import Auth from '../libs/auth';
import styles from './styles/login.js';

class LoginPage extends Component {
  constructor () {
    super();

    this.state = {
      isLoggedIn: false,
      authCallbackIndex: null,
      authError: null,
      codeCantine: "",
      fairPay: ""
    };
  }

  componentDidMount () {
    let self = this;

    let index = Auth.onAuth((user, error) => {
      if (user) {
        self.setState({isLoggedIn: true});
      } else {
        self.setState({isLoggedIn: false});
      }
      self.setState({authError: error});
    });

    this.setState({
      authCallbackIndex: index
    });
  }

  componentWillUnmount () {
    Auth.removeCallback('auth', this.state.index);
  }

  getCodeCantine(email) {
    fetch('https://bde.esiee.fr/fairpay/api/students/'+email+'/search', {
      method: 'get'
    })
    .then((response) => {
      response.json().then((json) => {
        this.setState({
          codeCantine: json[0].id,
        });
      })
    });
  }

  getFairPayBalance(email) {
    fetch('https://bde.esiee.fr/fairpay/api/students/'+email+'/search', {
      method: 'get'
    })
    .then((response) => {
      response.json()
      .then((json) => {
        fetch('https://bde.esiee.fr/fairpay/api/student/balance?client_id='+json[0].id, {
          method: 'get'
        })
        .then((response) => {
          response.json().then((json2) => {
            this.setState({
              codeCantine: json[0].id,
              fairPay: json2.balance,
            });
          })
        });
      })
    });
  }

  render () {
    let text = 'Mon compte';
    let button;
    let textFairpay = '';
    let barcode;

    if (this.state.isLoggedIn) {
      text = Auth.getUser().name;
      let codeCantine = '' + this.state.codeCantine;
      let height = 50;
      let width = 1.5;
      this.getFairPayBalance(Auth.getUser().email);
      if(this.state.fairPay) {
        textFairpay = '\nTon solde FairPay : '+this.state.fairPay+'€';
        barcode = (
          <View style={styles.barcode}>
            <Barcode 
              value={codeCantine}
              format="CODE39"
              height={height}
              width={width}
            />
            <Text style={styles.barcodeText}>
              {codeCantine}
            </Text>
          </View>
        );
      }
      button = (
        // Button logout sa mère
        <Button
          value='Se déconnecter'
          text='Se déconnecter'
          raised
          onPress={() => Auth.signOut(false)} />
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
      <View style={styles.containerBar}>
        <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.2)" barStyle="light-content"/>
        <View>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#f4373b', '#f4373b']}
            style={styles.topBar}>
            <TouchableOpacity></TouchableOpacity>
            <Text style={styles.topBarText}>
              <Text style={styles.topBarNormalText}>Compte</Text>
            </Text>
            <TouchableOpacity></TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {text}
          </Text>
          <Text style={styles.fairpay}>
            {textFairpay}
          </Text>
          {barcode}
          <Text style={styles.welcome}>
            {this.state.authError ? this.state.authError : ''}
          </Text>
          {button}
        </View>
      </View>
    );
  }
}

module.exports = LoginPage;
