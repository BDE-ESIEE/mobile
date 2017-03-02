import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  topBar: {
    height:55,
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
  },
  topBarText: {
    color:"#ffffff",
    fontSize:17,
    fontFamily:"ProximaNova-Regular"
  },
  list: {
    flex:1
  }
});

module.exports = styles;
