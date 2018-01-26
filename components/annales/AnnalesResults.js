import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Linking,
  ListView,
  ActivityIndicator
} from 'react-native';

//import Piwik from 'react-native-piwik';
import { Card } from 'react-native-material-design';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <ActivityIndicator color="#1D976C" size="small"/>
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
    let message;
    if(error == "connection-error") {
      message = (
        <Text style={styles.errorText}>Erreur de connexion.</Text>
      )
    }
    if(error == "no-annales-found") {
      message = (
        <View>
          <Text style={styles.errorText}>Aucune annale trouvée avec ces critères.</Text>
          <Text style={styles.errorText}>Essaie par exemple "E1 Habib Cours" ou "SFP-2001"</Text>
        </View>
      )
    }
    if(error) {
      return (
        <View style={styles.errorView}>
          <Icon
            name='ios-close-circle-outline'
            size={50}
            style={styles.errorIcon}
          />
          {message}
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
            <Icon
              name='ios-bulb-outline'
              size={26}
              style={styles.suggestionIcon}
            />
            <Text style={styles.suggestionText}>
              <Text style={styles.suggestionNormalText}>Essayer en cherchant</Text>
              <Text style={styles.suggestionNormalText}> {suggestion}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  openLink (link) {
    // TODO FIXME Reenable piwik
    //Piwik.trackEvent('annales', 'download', link, 1);
    Linking.openURL(`https://bde.esiee.fr${link}`);
  }

  useSuggestion (suggestion) {
    console.log(suggestion);
    this.props.launchQuery(suggestion)
  }

}

module.exports = AnnalesResults;
