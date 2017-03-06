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
import styles from '../styles/rooms.js';
import RoomsList from './RoomsList';
moment.locale('fr');

class RoomsTab extends Component {
  constructor(props) {
      super(props);
      this.state = {
        timeDiff:2
      };
  }
  render() {
    let timeName = "maintenant";
    if(this.state.timeDiff != 0) {
      timeName = moment().add(this.state.timeDiff, 'hours').fromNow();
    }
    return (

      <View style={styles.container}>
         <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.2)" barStyle="light-content"/>
        <View>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#FE734C', '#FF4D59']}
            style={styles.topBar}>
            <TouchableOpacity onPress={()=>this.decrTime()}>
              <Text style={styles.topBarButton}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={styles.topBarText}>
              Salles libres
              <Text style={{fontFamily:"ProximaNova-RegItalic"}}> {timeName}</Text>
            </Text>
            <TouchableOpacity onPress={()=>this.incrTime()}>
              <Text style={styles.topBarButton}>
                +
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <RoomsList time={moment().add(this.state.timeDiff, 'hours').format()}></RoomsList>
      </View>
    );
  }
  incrTime() {
    this.setState({timeDiff:this.state.timeDiff + 1});
  }
  decrTime() {
    if(this.state.timeDiff > 0)
    this.setState({timeDiff:this.state.timeDiff - 1});
  }
}

module.exports = RoomsTab;
