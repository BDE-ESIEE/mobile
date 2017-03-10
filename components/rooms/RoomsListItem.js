import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from '../styles/rooms.js';


class RoomsListItem extends Component {
  render () {
    if(!this.props.epi.rooms.length) {
      return null;
    }
    return (
      <View >
        <View style={styles.roomsListItem}>
          <View style={{flexDirection: 'column', justifyContent:"center" , height: 80}}>
            <Text style={styles.roomsListItemSmall}>{this.props.epi.name}</Text>
            <Text style={styles.roomsListItemNumber}>{this.props.epi.number}</Text>
          </View>
          <View style={{height: 70, flex: 1, overflow:"hidden", paddingTop: 10, justifyContent:"center"}}>
              {/*<Text style={styles.EventCardTitle}>{this.props.epi.name}</Text>*/}
              <Text style={styles.roomsListItemDetail}>{this.props.epi.rooms.join(', ')}</Text>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = RoomsListItem;
