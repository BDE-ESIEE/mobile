import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  eventCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:"flex-start",
    borderBottomColor:"gray",
    borderBottomWidth:0
  },
  eventCardDateSmall: {
    width: 70,
    textAlign:"center",
    fontFamily:"ProximaNova-Regular"
  },
  eventCardDateNumber: {
    width: 70,
    textAlign:"center",
    fontSize:30,
    marginTop:-4,
    marginBottom:-4,
    fontFamily:"ProximaNova-Regular"
  },
  EventCardTitle: {
    fontFamily:"ProximaNova-Semibold",
    color: "#2a2a2a",
    fontSize: 14.5
  },
  EventCardDetail: {
    fontFamily:"ProximaNovaCond-Regular",
    color: "rgba(42, 42, 42, 0.7)",
    fontSize: 14
  },
  weekHeader: {
    height:155,
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center"
  },
  weekHeaderSmall: {
    height:30,
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center"
  },
  weekHeaderBigNumber: {
    color:"#ffffff",
    fontSize:40,
    fontWeight:"100",
    fontFamily:"ProximaNova-Bold",
    backgroundColor:"transparent"
  },
  weekHeaderText: {
    color:"#ffffff",
    fontSize:16,
    fontWeight:"400",
    fontFamily:"ProximaNova-Regular",
    backgroundColor:"transparent"
  },
  weekHeaderTextCurWeek: {
    color:"#ffffff",
    fontSize:16,
    fontWeight:"400",
    marginTop:10,
    fontFamily:"ProximaNova-Regular",
    backgroundColor:"transparent"
  },
  topBar: {
    height:55,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  topBarText:{
    backgroundColor:"transparent"
  },
  topBarNormalText: {
    color:"#ffffff",
    fontSize:16,
    fontFamily:"ProximaNova-Bold"
  },
  topBarEmphasisText: {
    color:"#ffffff",
    fontSize:16,
    fontFamily:"ProximaNova-BoldIt"
  },
  topBarButton: {
    color:"#ffffff",
    fontSize:25,
    fontFamily:"ProximaNova-Light",
    marginRight:20,
    marginLeft:20,
    backgroundColor:"transparent"
  }

});

module.exports = styles;
