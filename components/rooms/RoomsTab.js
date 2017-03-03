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
          rooms: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
              sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          }),
          loading:true
      };
  }
  componentDidMount() {
    this.getRooms()
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
        <View style={styles.list}>
          {this.state.loading ? (
            <Text>Loading</Text>
          ) : (<Text>Loaded</Text>) }
            <ListView
              dataSource={this.state.rooms}
              renderRow={(room,sectionID,rowID) => <Text>{room}</Text>}
              />
        </View>
      </View>
    );
  }
  getRooms(time) {
    fetch('https://bde.esiee.fr/api/calendar/rooms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {

      response.json().then((json) => {
        let rooms = json;
        let roomsByEpi = [[],[],[],[],[],[],[]];
        rooms.map((room)=>{
          let roomCategory = this.getRoomCategory(room);
          roomsByEpi[roomCategory].push(room);
        });
        console.log(room)
        this.setState({
          rooms:this.state.rooms.cloneWithRows(rooms),
          loading:false
        });
      });
    });
  }
  getRoomCategory(room) {
    if (isNaN(room))
      return 0;
    var roomNumber = parseInt(room);
    if (roomNumber > 999 && roomNumber < 8000) {
      return Math.floor(roomNumber / 1000)
    } else {
      return 0;
    }
  };
}

module.exports = RoomsTab;
