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
  },
  roomsListItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:"flex-start",
    borderBottomColor:"gray",
    borderBottomWidth:0
  },
  roomsListItemSmall: {
    width: 70,
    textAlign:"center",
    fontFamily:"ProximaNova-Regular"
  },
  roomsListItemNumber: {
    width: 70,
    textAlign:"center",
    fontSize:30,
    marginTop:-4,
    marginBottom:-4,
    fontFamily:"ProximaNova-Regular"
  },
  roomsListItemTitle: {
    fontFamily:"ProximaNova-Semibold",
    color: "#2a2a2a",
    fontSize: 14.5
  },
  roomsListItemDetail: {
    fontFamily:"ProximaNova-Regular",
    color: "rgba(42, 42, 42, 0.7)",
    fontSize: 13
  },
});

module.exports = styles;
