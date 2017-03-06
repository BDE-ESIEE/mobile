import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ListView,
  LayoutAnimation,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';


import AnnalesApi from '../../libs/api/annales';
import Auth from '../../libs/auth';
import styles from '../styles/annales.js';
import AnnaleCard from './AnnaleCard';

class AnnalesHome extends Component {
  constructor () {
    super();

    this.state = {
      isLoggedIn: false,
      annales: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      authCallbackIndex: null,
      searchHeight:1,
      listHeight:0,
      listMaxHeight:0
    };

    this.search = this.search.bind(this);
  }

  componentDidMount () {

    let self = this;

    let index = Auth.onAuth((user) => {
      if (user) {
        self.setState({isLoggedIn: true});
      } else {
        self.setState({isLoggedIn: false});
      }
    });

    this.setState({
      authCallbackIndex: index
    });
  }

  componentWillUnmount () {
    Auth.removeCallback('auth', this.state.index);
  }

  search (event) {
    let self = this;

    AnnalesApi
    .searchAnnales(event.nativeEvent.text)
    .then((response) => {
      console.log(response);
      self.setState({
        annales: this.state.annales.cloneWithRows(response.documents)
      });
      // Animating Heights
      setTimeout(()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
          searchHeight:0,
          listHeight:1,
          listMaxHeight:999999
        })
      },1000)
    }).catch((error) => {
      console.log(error);
    });
  }

  render () {
    let components;

    if (this.state.isLoggedIn) {
      components = (
        <View style={{flex: 1, flexDirection: 'column',marginTop:-40*this.state.searchHeight, marginBottom:-40*this.state.searchHeight}}>
          <KeyboardAvoidingView behavior="padding"
          style={{flexDirection:"column", flex:this.state.searchHeight, minHeight:80}}>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#FE734C', '#FF4D59']}
            style={styles.searchBg}>
            <View style={styles.inputContainer}>
              <Icon
                name="ios-search"
                size={21}
                style={styles.inputIcon}
              />
              <TextInput
                onSubmitEditing={this.search}
                returnKeyType='search'
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Cherchez une annale"
              />
          </View>

          </LinearGradient>
        </KeyboardAvoidingView>


          <ListView
            dataSource={this.state.annales}
            style={{flex:this.state.listHeight,maxHeight:this.state.listMaxHeight}}
            renderRow={(annale) => <AnnaleCard annale={annale} style={{opacity:1}} />}
          />
        </View>
      );
    } else {
      components = (
        <Text style={styles.welcome}>
          Connexion obligatoire frère.
        </Text>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.2)" barStyle="light-content"/>
        {components}
      </View>
    );
  }
}

module.exports = AnnalesHome;
