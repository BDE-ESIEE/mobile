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
  annales: {
    flex: 1,
    flexDirection: 'column',
    marginTop:-30,
    marginBottom:-30
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
  },
  inputIcon: {
    marginTop:9,
    marginRight:9,
    color:"#FFFFFF"
  },
  searchBg: {
    flex:1,
    flexDirection:"column",
    justifyContent:"center"

  }
});

module.exports = styles;
