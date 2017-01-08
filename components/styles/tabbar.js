import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  tabs: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#ef476f',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: '#fff'
  },
  tabName: {
    fontSize: 10,
    color: '#fff'
  }
});

module.exports = styles;
