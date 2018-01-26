import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../styles/agenda.js';
import Calendar from './AgendaCalendar';

moment.locale('fr');

class AgendaTab extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Calendar></Calendar>
      </View>
    );
  }
}

module.exports = AgendaTab;
