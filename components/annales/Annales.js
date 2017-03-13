import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  LayoutAnimation
} from 'react-native';

import styles from '../styles/annales.js'
import AnnalesApi from '../../libs/api/annales';
import Auth from '../../libs/auth';
import AnnalesResults from './AnnalesResults';
import AnnalesSearch from './AnnalesSearch';

class Annales extends Component {
  constructor () {
    super();

    this.state = {
      loggedIn: false,
      currentPage:1,
      lastPage:false,
      currentQuery:"",
      suggestion: false,
      loading:false,
      landing:true,
      error:false, // false, "connection-error", "no-annales"
      annales:[],
      annalesDataSource: new ListView.DataSource({
        //TODO : FIXME : PLEASE : Figure out why this doesn't work otherwise
        rowHasChanged: (row1, row2) => {return true} // I'm sorry.
      })
    };

    this.launchQuery = this.launchQuery.bind(this);
    this.getAnnalesPage = this.getAnnalesPage.bind(this);
    this.getAnnaleDetail = this.getAnnaleDetail.bind(this);
    this.clearAnnales = this.clearAnnales.bind(this);
  }

  componentDidMount () {
    Auth.onAuth((user) => {
        this.setState({loggedIn: user ? true:false});
    });

  }

  getAnnalesPage (query, page = 1) {
    this.setState({
      loading:true
    })
    AnnalesApi
    .searchAnnales(query,page)
    .then((response) => {
      console.log(response);
      if(response.documents.length) { // On a trouvé des annales
        let newAnnales = this.state.annales.concat(response.documents);
        this.setState({
          annales:newAnnales,
          annalesDataSource: this.state.annalesDataSource.cloneWithRows(newAnnales)
        });
      } else { // Il n'y pas d'annales avec cette recherche
        this.setState({
          error:"no-annales-found"
        });
      }
      this.setState({
        lastPage:response.next_page ? false : true,
        suggestion:response.suggestion,
        loading:false
      })
    }).catch((error) => {
      this.setState({
        error:"connection-error",
        loading:false
      });
    });
  }

  getAnnaleDetail (annaleIndex) {
    // Set state to loading details
    let newAnnales = this.state.annales.slice(0);
    newAnnales[annaleIndex].loading = true;
    this.setState({
      annales:newAnnales,
      annalesDataSource: this.state.annalesDataSource.cloneWithRows(newAnnales)
    });

    AnnalesApi
    .fetchAnnale(this.state.annales[annaleIndex].id)
    .then((response) => {
      // Insert the details in state
      let newAnnales = this.state.annales.slice(0);
      newAnnales[annaleIndex].details = response.document;
      this.setState({
        annales:newAnnales,
        annalesDataSource: this.state.annalesDataSource.cloneWithRows(newAnnales)
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  clearAnnales () {
    this.setState({
      annales:[],
      annalesDataSource: this.state.annalesDataSource.cloneWithRows([]),
      suggestion:false,
      error:false,
      currentPage:1,
      lastPage:false
    });
  }

  launchQuery (query) {

    if(!query) {
      var query = this.state.currentQuery;
    }
    if (this.state.currentQuery != query) {
      this.clearAnnales();
    }
    if(!this.state.lastPage) {
      this.getAnnalesPage(query,this.state.currentPage);
      this.setState({
        currentQuery:query,
        currentPage:this.state.currentPage + 1
      });
    }
    this.setState({landing:false})
  }

  render () {
    if(this.state.loggedIn) {
      return (
        <View style={styles.wrapper}>
          <AnnalesSearch
            launchQuery={this.launchQuery}
            landing={this.state.landing}
            loading={this.state.loading}
            />
          <AnnalesResults
            launchQuery={this.launchQuery}
            getAnnaleDetail={this.getAnnaleDetail}

            annalesDataSource={this.state.annalesDataSource}
            lastPage={this.state.lastPage}
            error={this.state.error}
            landing={this.state.landing}
            loading={this.state.loading}
            />
        </View>
      )
    } else {
      return (
        <View style={styles.wrapper}>
          <Text style={styles.welcome}>
            Connexion obligatoire frère.
          </Text>
        </View>
      )
    }
  }
}

module.exports = Annales;
