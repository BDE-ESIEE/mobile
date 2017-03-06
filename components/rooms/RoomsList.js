import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ListView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import styles from '../styles/rooms.js';
import RoomsListItem from './RoomsListItem';

const loadingMessages = [
  "Nous envoyons un membre de la log parcourir les salles...",
  "Nos capteurs biométriques testent les salles...",
  "Le chien du BDE prend note des salles libres...",
  "Reticulating Splines...",
  "Nous testons votre  patience...",
  "Connexion au satellite de mesure de présence...",
  "Émission du signal hertzien à fréquence dynamique d'évaluation présentielle géofencée...",
  "Ca va toujours plus vite que si t'allais voir toi-même."
]

class RoomsList extends Component {
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
    this.getRooms(this.props.time);
  }
  componentWillReceiveProps() {
    this.setState({loading:true});;
  }
  componentDidUpdate(prevProps){
    if(prevProps != this.props) {
      this.getRooms(this.props.time);
    }
  }
  render() {
    let loadingElement;
    let listElement;
    if(this.state.loading) {
      let loadingText = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      loadingElement = (
        <View style={styles.loading}>
          <ActivityIndicator color="#FF4D59" size="large" style={styles.loadingIndicator}/>
          <Text style={styles.loadingText}>
            {loadingText}
          </Text>
        </View>
      )
    } else {
      listElement = (
        <ListView
          dataSource={this.state.rooms}
          renderRow={(epi,sectionID,rowID) => <RoomsListItem epi={epi}></RoomsListItem>}
          />
      )
    }
    return (
        <View style={styles.list}>
          {loadingElement}
          {listElement}
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
        let roomsByEpi = [
          {name:"Autres",rooms:[]},
          {name:"Épi",number:"1",rooms:[]},
          {name:"Épi",number:"2",rooms:[]},
          {name:"Épi",number:"3",rooms:[]},
          {name:"Épi",number:"4",rooms:[]},
          {name:"Épi",number:"5",rooms:[]},
          {name:"Épi",number:"6",rooms:[]},
          {name:"Épi",number:"7",rooms:[]},
        ];
        rooms.map((room)=>{
          let roomCategory = this.getRoomCategory(room);
          roomsByEpi[roomCategory].rooms.push(room);
        });
        roomsByEpi.push(roomsByEpi.shift())
        this.setState({
          rooms:this.state.rooms.cloneWithRows(roomsByEpi),
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

module.exports = RoomsList;
