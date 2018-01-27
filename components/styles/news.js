import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  topBar: {
    paddingTop:25,
    height:80,
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
  },
  newsCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:"flex-start",
    borderBottomColor:"gray",
    borderBottomWidth:0
  },
  newsCardDateSmall: {
    width: 70,
    textAlign:"center",
    fontFamily:"ProximaNova-Regular"
  },
  newsCardDateNumber: {
    width: 70,
    textAlign:"center",
    fontSize:30,
    marginTop:-4,
    marginBottom:-4,
    fontFamily:"ProximaNova-Regular"
  },
  NewsCardTitle: {
    fontFamily:"ProximaNova-Semibold",
    color: "#2a2a2a",
    fontSize: 15.5
  },
  NewsCardDetail: {
    fontFamily:"ProximaNovaCond-Regular",
    color: "rgba(42, 42, 42, 0.7)",
    fontSize: 15
  },
  loading: {
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    padding:40
  },
  loadingIndicator: {
    marginBottom:30
  },
  loadingText: {
    color:"black",
    fontSize:23,
    fontFamily:"ProximaNova-Light",
    textAlign:"center",
    lineHeight:30
  },
});

module.exports = styles;
