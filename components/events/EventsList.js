import React, { Component } from 'react';
import {
  Text,
  View,
  ListView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import styles from '../styles/events.js';
import EventCard from './EventCard';

class EventsList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          events: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
              sectionHeaderHasChanged: (s1, s2) => s1 !== s2
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
          renderRow={(event,sectionID,rowID) => <EventCard event={event} row={rowID}></EventCard>}
          renderSectionHeader={this.renderHeader}
          />
      </View>
    );
  }
  renderHeader(sectionData, sectionID) {
    if(sectionID == 0) {
      return (
        <View>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#FE734C', '#FF4D59']}
            style={styles.weekHeader}>
            <Text style={styles.weekHeaderBigNumber} >{sectionData.length}</Text>
            <Text style={styles.weekHeaderTextCurWeek}>Évènement{sectionData.length>1 ? 's':''} cette semaine !</Text>
          </LinearGradient>
        </View>
      )
    } else {
      let weekText = sectionID == 1 ? "La semaine prochaine":("Dans " + sectionID + " semaines");
      return (
        <View>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#FE734C', '#FF4D59']}
            style={styles.weekHeaderSmall}>
            <Text style={styles.weekHeaderText}>{weekText}</Text>
          </LinearGradient>
        </View>
      )
    }

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
        let eventsByWeek = {};
        events.map((event)=>{
          let start = moment(event.start);
          let end = moment(event.end);
          if(end.isAfter()) {
            let weekDiff = end.week()-moment().week();
            if(!eventsByWeek[weekDiff]) {
              eventsByWeek[weekDiff] = [];
            }
            eventsByWeek[weekDiff].push(event);
            eventsByWeek[weekDiff].push(event);
            eventsByWeek[weekDiff].push(event);
          }
        })
        this.setState({events:this.state.events.cloneWithRowsAndSections(eventsByWeek)});
      });
    });
  }
}

module.exports = EventsList;
