import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Piwik from 'react-native-piwik';
import { Card } from 'react-native-material-design';

import styles from '../styles/annales.js'

import AnnalesApi from '../../libs/api/annales';
import Auth from '../../libs/auth';

class AnnaleCard extends Component {
  constructor () {
    super();
    this.state = {
      open:false,
      loaded:false,
      links:[]
    }
  }
  render () {
    let cardLinks;
    if(this.state.open && !this.state.loaded) {
      cardLinks = (
        <View>
          <Text>Loading lol</Text>
        </View>
      )
    } else if(this.state.open && this.state.loaded) {
      cardLinks = (
        <View>
          <View style={{height:1, paddingRight:-15, backgroundColor:'grey'}}></View>
          {this.state.links.map((link, i) => {
            return (
              <TouchableOpacity key={link.id} onPress={() => this.openLink(link.download_path)}>
                <Text style={{textDecorationLine: 'underline'}}>{link.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )
    }
    return (
      <View >
        <TouchableOpacity onPress={() => {this.toggle()}} >
          <Card>
            <Card.Body>
              <Text style={styles.cardSubject}>{this.props.annale.subject}</Text>
              <Text style={styles.cardText}>{this.props.annale.teacher}</Text>
              <Text style={styles.cardText}>{this.props.annale.unit}</Text>
              <Text style={styles.cardText}>{this.props.annale.year}</Text>
              {cardLinks}
            </Card.Body>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
  toggle () {
    let self = this;
    this.setState({open:!this.state.open});
    if(!this.state.loaded) {
      AnnalesApi
      .fetchAnnale(this.props.annale.id)
      .then((response) => {
        console.log(response);
        self.setState({loaded:true, links:response.document.files});
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  openLink (link) {
    Piwik.trackEvent('annales', 'download', link, 1);
    Linking.openURL(`https://bde.esiee.fr${link}`);
  }
}

module.exports = AnnaleCard;
