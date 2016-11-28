import React, { Component } from 'react';
import {
  Text,
  View,
  ListView
} from 'react-native';

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
        <ListView
          dataSource={this.state.events}
          renderRow={(event) => <EventCard event={event}></EventCard>}
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
