'use strict';

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import Piwik from 'react-native-piwik';

import styles from './styles/tabbar.js';

class TabBar extends React.Component {
  render () {
    const tabToIconName = ['ios-calendar', 'ios-school', 'ios-bookmarks', 'ios-pin', 'ios-person'];
    // Duplication of App.js... because we don't want to use Flux/Redux
    const tabToRoute = ['events', 'agenda', 'annales', 'rooms', 'account'];

    let goToPage = (props, i) => {
      if (props.goToPage) {
        props.goToPage(i);
        // User tracking
        // TODO FIXME Reenable piwik
        // Piwik.trackScreen(`/${tabToRoute[i]}`, props.tabs[i]);
      }
    };

    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => {
          let active = this.props.activeTab === i;
          let color = active ? '#1D976C' : '#4a4a4a';
          return (
            <TouchableOpacity key={tab} onPress={() => { goToPage(this.props, i); }} style={styles.tab}>
              <Icon
                name={tabToIconName[i] + (active ? '' : '-outline')}
                size={23}
                color={color}
              />
              <Text style={{fontSize: 11.5, color: color, fontFamily: 'ProximaNova-Bold'}}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

module.exports = TabBar;
