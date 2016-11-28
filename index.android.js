/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TopNavigation from './components/TopNavigation';

class Lagoon extends Component {
  render() {
    return (
      <TopNavigation />
    );
  }
}

AppRegistry.registerComponent('Lagoon', () => Lagoon);
