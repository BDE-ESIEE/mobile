import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ListView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Auth from '../../libs/auth';
import { Agenda, LocaleConfig } from 'react-native-calendars';

import styles from '../styles/agenda.js';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

LocaleConfig.defaultLocale = 'fr';

const loadingMessages = [
  "Wallerand Delevacq parcourt ton agenda..."
]

class AgendaCalendar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          courses: new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
              sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          }),
          items: {},
          json: {},
          loggedIn: false,
          loading: true,
          loadingText: "Wallerand Delevacq parcourt ton agenda..."
      };
  }
  componentDidMount() {
    this.getRooms(this.props.time);
  }
  componentDidMount() {
    Auth.onAuth((user) => {
        this.setState({loggedIn: user ? true:false, email: Auth.getUser().email});
        this.getAgenda(this.state.email);
    });
  }
  componentDidUpdate(prevProps){
    if(prevProps != this.props) {
      this.getAgenda(this.state.email);
    }
  }
  render() {
    let loadingElement;
    let agenda;
    if(this.state.loading) {
      loadingElement = (
        <View style={styles.loading}>
          <ActivityIndicator color="#1D976C" size="large" style={styles.loadingIndicator}/>
          <Text style={styles.loadingText}>
            {this.state.loadingText}
          </Text>
        </View>
      )
    } else {
      agenda = (
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          firstDay={1}
          theme={{calendarBackground: 'white', agendaKnobColor: '#1D976C', agendaDayTextColor: '#1D976C', agendaDayNumColor: '#1D976C'}}
        />
      )
    }
    if(this.state.loggedIn) {
      return (
        <View style={styles.list}>
          <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.2)" barStyle="light-content"/>
          <View>
            <LinearGradient
              start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
              colors={['#1D976C', '#1D976C']}
              style={styles.topBar}>
              <TouchableOpacity></TouchableOpacity>
              <Text style={styles.topBarText}>
                <Text style={styles.topBarNormalText}>Agenda</Text>
              </Text>
              <TouchableOpacity></TouchableOpacity>
            </LinearGradient>
          </View>
          {loadingElement}
          {agenda}
        </View>
      );
    } else {
      return (
        <View style={styles.wrapper}>
          <Text style={styles.welcome}>
            Connexion obligatoire frère.
          </Text>
        </View>
      )
    }
  }

  getAgenda(email) {
    fetch('http://ade.wallforfry.fr/api/ade-esiee/agenda/'+email, {
      method: 'get'
    })
    .then((response) => {
      response.json().then((json) => {
        this.setState({
          json: json,
          loading: false
        });
      })
    })
    .catch((error) => {
      this.setState({
        loadingText: "L'API de Wallerand est en PLS, essaie plus tard..."
      });
    });
  }

  loadItems(day) {
    const newItems = {};
    var data = this.state.json;
    var json = Object.keys(data).map(e => ({name: data[e].name, start: data[e].start, "end": data[e].end, "rooms": data[e].rooms, "prof": data[e].prof, "unite": data[e].unite})).sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      newItems[strTime] = [];
    }
    for (var i = 0; i < json.length; i++) {
      var start = new Date(json[i].start);
      var end = new Date(json[i].end);
      start.setHours(start.getHours() - 7);
      end.setHours(end.getHours() - 7);
      var day = start.getFullYear() + "-" + ("0" + start.getMonth()+1).slice(-2) + "-" + ('0' + start.getDate()).slice(-2);
      if(!newItems[day]) newItems[day] = [];
      var name = start.getHours() + ":" + ('0' + start.getMinutes()).slice(-2) + " - " + end.getHours() + ":" + ('0' + end.getMinutes()).slice(-2) + "\n\n" + json[i].name + "\n" + json[i].unite + "\n\n" + json[i].rooms + "\n\n" + json[i].prof;
      newItems[day].push({
        name: name,
        height: name.split(/\r\n|\r|\n/).length * 20
      });
    }
    this.setState({
      items: newItems
    });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Pas de cours</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

module.exports = AgendaCalendar;
