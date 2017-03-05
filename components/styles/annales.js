import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
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
    paddingTop:25
  },
  cardSubject: {
    color:"#000",
    fontFamily:"ProximaNova-Bold",
    fontSize:14.5
  },
  cardText: {
    fontFamily:"ProximaNovaCond-Regular",
    fontSize:14.5
  }
});

module.exports = styles;
