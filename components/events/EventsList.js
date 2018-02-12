import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  Button,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../styles/events.js';
import EventCard from './EventCard';

import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Actions } from "react-native-router-flux";


class EventsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      events: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      loading: true,
      refreshing: false
    };
  }

  componentDidMount () {
    this.getEvents();
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getEvents();
  }

  render () {
    let loadingElement;
    let listElement;
    if (this.state.loading) {
      loadingElement = (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          <ActivityIndicator color='#1D976C' size='large' />
        </View>
      );
    } else {
      listElement = (
        <ListView
          dataSource={this.state.events}
          renderRow={(event, sectionID, rowID) => <EventCard event={event} row={rowID} />}
          renderSectionHeader={this.renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor={'#1D976C'}
            />
          }
        />
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' barStyle='light-content' />
        <LinearGradient
          start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
          colors={['#1D976C', '#1D976C']}
          style={{...ifIphoneX({height: 45}, {height: 25})}}
        />
        <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.2)" barStyle="light-content"/>
          <View>
            <LinearGradient
              start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
              colors={['#1D976C', '#1D976C']}
              style={styles.topBar}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Icon
                  name='ios-arrow-dropleft-outline'
                  style={styles.topBarButton}
                />
              </TouchableOpacity>
              <Text style={styles.topBarText}>
                <Text style={styles.topBarNormalText}>Évènements</Text>
              </Text>
              <TouchableOpacity activeOpacity={1}>
                <Icon
                  name='ios-arrow-dropright-outline'
                  style={[styles.topBarButton, {
                    opacity: 0.3
                  }]}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        {loadingElement}
        {listElement}
      </View>
    );
  }

  renderHeader (sectionData, sectionID) {
    if (sectionID === '0') {
      return (
        <View>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#1D976C', '#1D976C']}
            style={styles.weekHeader}>
            <Text style={styles.weekHeaderBigNumber}>{sectionData.length}</Text>
            <Text style={styles.weekHeaderTextCurWeek}>Évènement{sectionData.length > 1 ? 's' : ''} cette semaine !</Text>
          </LinearGradient>
        </View>
      );
    } else {
      let weekText = sectionID === '1' ? 'La semaine prochaine' : (`Dans ${sectionID} semaines`);
      return (
        <View>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#1D976C', '#53BD8C']}
            style={styles.weekHeaderSmall}>
            <Text style={styles.weekHeaderText}>{weekText}</Text>
          </LinearGradient>
        </View>
      );
    }
  }

  getEvents() {
    fetch('https://bde.esiee.fr/events.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      response.json().then((json) => {
        let events = json;
        let eventsByWeek = {};
        events.map((event) => {
          let start = moment(event.start);
          // let end = moment(event.end);
          if (start.isAfter()) {
            let weekDiff = start.week() - moment().week();
            if (!eventsByWeek[weekDiff]) {
              eventsByWeek[weekDiff] = [];
            }
            eventsByWeek[weekDiff].push(event);
          }
        });
        this.setState({loading: false, events: this.state.events.cloneWithRowsAndSections(eventsByWeek), refreshing: false});
      });
    });
  }
}

module.exports = EventsList;
