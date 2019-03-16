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

import styles from '../styles/rooms.js';
import RoomsList from './RoomsList';

moment.locale('fr');

class RoomsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeDiff:0
    };
  }
  render() {
    let timeName = "maintenant";
    if(this.state.timeDiff > 0) {
      timeName = moment().add(this.state.timeDiff, 'hours').calendar(null,{sameElse:'[le] DD/MM à HH:MM'}).toLowerCase();
    }
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.2)" barStyle="light-content"/>
        <View>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#f4373b', '#f4373b']}
            style={styles.topBar}>
            <TouchableOpacity
              onPress={()=>this.decrTime()}
              activeOpacity={this.state.timeDiff ? 0.2:1}>
              <Icon
                name='ios-arrow-dropleft-outline'
                style={[styles.topBarButton, {
                  opacity: this.state.timeDiff ? 1:0.3
                }]}
              />
            </TouchableOpacity>
            <Text style={styles.topBarText}>
              <Text style={styles.topBarNormalText}>Salles libres</Text>
              <Text style={styles.topBarEmphasisText}> {timeName}</Text>
            </Text>
            <TouchableOpacity onPress={()=>this.incrTime()}>
              <Icon
                name='ios-arrow-dropright-outline'
                style={styles.topBarButton}
              />
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
