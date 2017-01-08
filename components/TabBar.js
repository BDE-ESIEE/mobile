'use strict';

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/tabbar.js';

class TabBar extends React.Component {
  render () {
    const tabToIconName = {
      'Événements': 'calendar',
      'Annales': 'book'
    };

    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => {
          return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
            <Icon
              name={tabToIconName[tab]}
              size={this.props.activeTab === i ? 28 : 20}
              style={styles.icon}
            />
            <Text style={styles.tabName}>{tab}</Text>
          </TouchableOpacity>;
        })}
      </View>
    );
  }
}

module.exports = TabBar;
