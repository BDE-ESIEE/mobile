import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontFamily:"ProximaNova-Light"
  },
  fairpay: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily:"ProximaNova-Light"
  },
  barcode: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  barcodeText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily:"ProximaNova-Light"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
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
  }
});

module.exports = styles;
