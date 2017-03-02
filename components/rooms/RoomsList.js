import React, { Component } from 'react';
import {
  Text,
  View,
  ListView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import styles from '../styles/rooms.js';

class RoomsList extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Coucou Liste</Text>
      </View>
    );
  }
}

module.exports = RoomsList;
