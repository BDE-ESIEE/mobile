import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    flexDirection:"column",
    justifyContent:"center"
  },
  wrapperResults: {
    flexDirection:"column"
  },
  wrapperSearch: {
     minHeight:80,
     flexDirection: 'column'
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontFamily:"ProximaNova-Light"
  },
  // AnnalesSearch
  inputContainer: {
    height: 40,
    backgroundColor:"rgba(255, 255, 255, 0.4)",
    margin:10,
    borderRadius:20,
    overflow:"hidden",
    flexDirection:"row",
    paddingLeft:10,
    paddingRight:10,
  },
  input: {
    flex: 1,
    overflow:"hidden",
    marginRight:10,
    borderBottomWidth:0,
    color:"rgba(255 , 255 , 255 , 0.9)",
    fontFamily:"ProximaNova-Regular",
    fontSize:14.5
  },
  inputIcon: {
    marginTop:9,
    marginRight:9,
    color:"#FFFFFF"
  },
  searchBg: {
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    paddingTop:25,
    minHeight:80
  },
  //AnnalesResults
  cardSubject: {
    color:"#000",
    fontFamily:"ProximaNova-Bold",
    fontSize:14.5
  },
  cardText: {
    fontFamily:"ProximaNovaCond-Regular",
    fontSize:14.5
  },
  suggestionView: {
    borderRadius:3,
    backgroundColor:"#FFFFFF",
    position:"absolute",
    left:20,
    right:20,
    top: 10
  },
  suggestionTouch: {
    padding:15
  },
  suggestionText: {
    fontFamily:"ProximaNova-Semibold",
  }
});

module.exports = styles;
