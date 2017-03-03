import React, { Component } from 'react';
import {
  Text,
  View,
  ListView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import styles from '../styles/rooms.js';
import RoomsList from './RoomsList';

class RoomsTab extends Component {
  constructor(props) {
      super(props);
      this.state = {
        time:""
      };
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#FE734C', '#FF4D59']}
            style={styles.topBar}>
            <Text style={styles.topBarText}>Salles libres <Text style={{fontFamily:"ProximaNova-RegItalic"}}>maintenant</Text></Text>
          </LinearGradient>
        </View>
        <RoomsList time={this.state.time}></RoomsList>
      </View>
    );
  }
}

module.exports = RoomsTab;
