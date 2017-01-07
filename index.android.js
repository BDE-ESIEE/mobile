/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import AppRouter from './components/AppRouter';

class Lagoon extends Component {
  render () {
    return (
      <AppRouter />
    );
  }
}

AppRegistry.registerComponent('Lagoon', () => Lagoon);
