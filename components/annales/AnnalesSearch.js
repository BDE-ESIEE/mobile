import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ListView,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';



import styles from '../styles/annales.js'

class AnnalesSearch extends Component {
  constructor () {
    super();

    this.state = {
      text: ""
    };
    this.submit = this.submit.bind(this);
  }

  render () {
    return (
        <KeyboardAvoidingView behavior='padding'
          style={[styles.wrapperSearch,
            {
              flex:this.props.landing ? 1:0,
              marginBottom:this.props.landing ? -160:0,
            }]}>
          <LinearGradient
            start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
            colors={['#1D976C', '#1D976C']}
            style={styles.searchBg}>
            <View style={styles.inputContainer}>
              <Icon
                name='ios-search'
                size={21}
                style={styles.inputIcon}
              />
              <TextInput
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                onSubmitEditing={this.submit}
                returnKeyType='search'
                style={styles.input}
                underlineColorAndroid='transparent'
                placeholder='Cherchez une annale'
              />
            <ActivityIndicator animating={this.props.loading} color="#FFFFFF" size="small"/>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
    )
  }

  submit() {
    this.props.launchQuery(this.state.text);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text:nextProps.currentQuery});
  }

}

module.exports = AnnalesSearch;
