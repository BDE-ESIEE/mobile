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
  list: {
    flex:1
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  wrapper: {
    flex:1,
    flexDirection:"column",
    justifyContent:"center"
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontFamily:"ProximaNova-Light"
  }
});

module.exports = styles;
