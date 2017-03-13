import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  ListView,
  ActivityIndicator
} from 'react-native';
import Piwik from 'react-native-piwik';
import { Card } from 'react-native-material-design';

import styles from '../styles/annales.js'


class AnnalesResults extends Component {
  render () {
    return (
      <View style={[styles.wrapperResults,{
          flex:this.props.landing ? 0:1
        }]}>
        <ListView
          dataSource={this.props.annalesDataSource}
          renderRow={(annale,xyz,index) => this.renderCard(annale,index,this.props.getAnnaleDetail)}
          onEndReached={() => this.props.launchQuery()}
          enableEmptySections={true}

        />
      {this.renderError(this.props.error)}
      </View>
    )
  }

  renderCard (annale,index,getAnnaleDetail) {
    let cardLinks;
    if(!annale.details && annale.loading) {
      cardLinks = (
        <View>
          <ActivityIndicator color="#FF4D59" size="small"/>
        </View>
      )
    }
    if(annale.details && annale.details.id) {
      cardLinks = (
        <View>
          {annale.details.files.map((link, i) => {
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
        <TouchableOpacity onPress={() => getAnnaleDetail(index)} >
          <Card>
            <Card.Body>
              <Text style={styles.cardSubject}>{annale.subject}</Text>
              <Text style={styles.cardText}>{annale.teacher}</Text>
              <Text style={styles.cardText}>{annale.unit}</Text>
              <Text style={styles.cardText}>{annale.year}</Text>
              {cardLinks}
            </Card.Body>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }

  renderError (error) {
    if(error == "connection-error") {
      return (
        <View>
          <Text>Erreur de connexion.</Text>
        </View>
      )
    }
    if(error == "no-annales-found") {
      return (
        <View>
          <Text>Aucune annale trouvée avec ces critères.</Text>
          <Text>Essaie par exemple "E1 Habib Cours" ou "SFP-2001"</Text>
        </View>
      )
    }
  }

  openLink (link) {
    Piwik.trackEvent('annales', 'download', link, 1);
    Linking.openURL(`https://bde.esiee.fr${link}`);
  }

}

module.exports = AnnalesResults;
