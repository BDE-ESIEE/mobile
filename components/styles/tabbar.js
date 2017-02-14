import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  tabs: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#d9d9d9',
    padding:5
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = styles;
