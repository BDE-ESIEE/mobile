import { GoogleSignin } from 'react-native-google-signin';
import moment from 'moment';

import Storage from './storage';

const annalesClientId = '2_4r1x05vo8oiswwgwk8okcgwo8s0o40c4cskkok8wwcs8k4woc4';
const annalesSecret = '25yyrbggzi9wg0wgskgc004wko8w0k0oowcg8kcsckgog80wkw';

/* global fetch */
class Auth {
  constructor () {
    this.user = {};

    this.signIn = this.signIn.bind(this);
    this.getUser = this.getUser.bind(this);
    this.annalesSignIn = this.annalesSignIn.bind(this);
    this.annalesRefresh = this.annalesRefresh.bind(this);
  }

  /**
   * Configure GoogleSignin
   */
  configure () {
    let self = this;
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      // play services are available. can now configure library
      GoogleSignin.configure({
        // scopes: [], // what API you want to access on behalf of the user, default is email and profile
        // iosClientId: '<FROM DEVELOPPER CONSOLE>', // only for iOS
        webClientId: '557464199167-4lbgvd3o6c6qjtqitqf1h8vkl9017csl.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
      })
      .then(() => {
        // you can now call currentUserAsync()
        self.getUser();
      });
    })
    .catch((err) => {
      console.log('Play services error', err.code, err.message);
    });
  }

  /**
   * @return {user} User object
   */
  getUser () {
    if (!this.user) {
      this.user = GoogleSignin.currentUser();
    }

    return this.user;
  }

  /**
   * Log into Google + Annales service
   */
  signIn () {
    var self = this;
    Storage.get('user').then((user) => {
      if (!user) {
        // User does not exist
        GoogleSignin.signIn()
        .then(function (user) {
          console.log('signIn', JSON.stringify(user));
          self.user = user;
          Storage.set('user', user);
          self.annalesSignIn();
        })
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        .done();
      } else {
        self.user = user;
        console.log('storage', JSON.stringify(self.user));
        if (!self.user.annales_tokens) {
          self.annalesSignIn();
        }
      }
    });
  }

  /**
   * Sign into annales service
   */
  annalesSignIn () {
    if (!this.user || !this.user.accessToken || !this.user.id || !this.user.accessToken) {
      console.log('cannot log into annales service');
    } else {
      let self = this;
      fetch('https://bde.esiee.fr/annales/oauth/v2/token/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'grant_type': 'social_access_token',
          'client_id': annalesClientId,
          'client_secret': annalesSecret,
          'social_id': this.user.id,
          'social_token': this.user.accessToken
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        self.user.annales_tokens = responseJson;
        self.user.annales_tokens.expires = moment().add(responseJson.expires_in, 'seconds').toDate();
        Storage.set('user', self.user);
      })
      .catch((error) => {
        console.error(error);
      })
      ;
    }
  }

  /**
   * Refresh annales service
   */
  annalesRefresh () {
    if (!this.user || !this.user.annales_tokens || !this.user.annales_tokens.refresh_token) {
      console.log('cannot refresh annales tokens');
    } else {
      let self = this;
      fetch('https://bde.esiee.fr/annales/oauth/v2/token/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'grant_type': 'refresh_token',
          'client_id': annalesClientId,
          'client_secret': annalesSecret,
          'refresh_token': this.user.annales_tokens.refresh_token
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        self.user.annales_tokens = responseJson;
        self.user.annales_tokens.expires = moment().add(responseJson.expires_in, 'seconds').toDate();
        Storage.set('user', self.user);
      })
      .catch((error) => {
        console.error(error);
      })
      ;
    }
  }
}

module.exports = new Auth();
