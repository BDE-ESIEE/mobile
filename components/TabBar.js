'use strict';

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles/tabbar.js';

class TabBar extends React.Component {
  render () {
    const tabToIconName = ['ios-calendar', 'ios-bookmarks', 'ios-person'];

    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => {
          let active = this.props.activeTab == i;
          let color = active ? "#FE734C" : "#4a4a4a";
          return (
            <TouchableOpacity key={tab} onPress={() => { if (this.props.goToPage) { this.props.goToPage(i); } }} style={styles.tab}>
              <Icon
                name={tabToIconName[i] + (active ? "":"-outline")}
                size={23}
                color={color}
              />
            <Text style={{fontSize: 11,color:color}}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

module.exports = TabBar;
