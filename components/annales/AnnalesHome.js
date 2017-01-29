import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  ListView
} from 'react-native';

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
      authCallbackIndex: null
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
      self.setState({
        annales: this.state.annales.cloneWithRows(response.documents)
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  render () {
    let components;

    if (this.state.isLoggedIn) {
      components = (
        <View style={styles.annales}>
          <View style={styles.inputContainer}>
            <TextInput
              onSubmitEditing={this.search}
              returnKeyType='search'
              style={styles.input}
            />
          </View>
          <ListView
            dataSource={this.state.annales}
            renderRow={(annale) => <AnnaleCard annale={annale} />}
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
        {components}
      </View>
    );
  }
}

module.exports = AnnalesHome;
