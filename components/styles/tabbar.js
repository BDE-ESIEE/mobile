import {
  StyleSheet
} from 'react-native';

import { ifIphoneX } from 'react-native-iphone-x-helper'

const styles = StyleSheet.create({
  tabs: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#d9d9d9',
    padding: 5,
    ...ifIphoneX({
      marginBottom: 20
    }, {
      marginBottom: 0
    })
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = styles;
