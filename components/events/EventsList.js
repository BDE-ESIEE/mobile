import React, { Component } from 'react';
import {
  Text,
  View,
  ListView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../styles/events.js';
import EventCard from './EventCard';

class EventsList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          events: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
          })
      };
  }
  componentDidMount() {
    this.getEvents();
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#FE734C', '#FF4D59']}
            style={{
              height:100,
              flexDirection: "column",
              justifyContent:"center",
              alignItems:"center"
            }}>
            <Text
              style={{
                color:"#ffffff",
                fontSize:40,
                fontWeight:"100",
                fontFamily:"ProximaNova-Bold"
              }}
              >1</Text>
            <Text style={{color:"#ffffff",fontSize:16,fontWeight:"400",fontFamily:"ProximaNova-Regular"}}>Évènement cette semaine</Text>
          </LinearGradient>
        </View>
        <ListView
          dataSource={this.state.events}
          renderRow={(event,sectionID,rowID) => <EventCard event={event} row={rowID}></EventCard>}
          />
      </View>
    );
  }
  getEvents() {
    fetch('https://bde.esiee.fr/events.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      response.json().then((json) => {
        let events = json.reverse();
        this.setState({events:this.state.events.cloneWithRows(events)});
      });
    });
  }
}

module.exports = EventsList;
