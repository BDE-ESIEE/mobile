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
          style={{paddingTop:this.props.suggestion ? 60:0}}
          dataSource={this.props.annalesDataSource}
          renderRow={(annale,xyz,index) => this.renderCard(annale,index,this.props.getAnnaleDetail)}
          onEndReached={() => this.props.loadNextPage()}
          enableEmptySections={true}

        />
      {this.renderSuggestion(this.props.suggestion)}
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

  renderSuggestion (suggestion) {
    if (suggestion) {
      return (
        <View style={styles.suggestionView} elevation={5}>
          <TouchableOpacity
            onPress={()=>this.useSuggestion(suggestion)}
            style={styles.suggestionTouch}>
            <Text style={styles.suggestionText} >Essayez en cherchant  "{suggestion}"</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  openLink (link) {
    Piwik.trackEvent('annales', 'download', link, 1);
    Linking.openURL(`https://bde.esiee.fr${link}`);
  }

  useSuggestion (suggestion) {
    console.log(suggestion);
    this.props.launchQuery(suggestion)
  }

}

module.exports = AnnalesResults;
