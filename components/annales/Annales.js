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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.ds = ds;
    this.state = {
      loggedIn: false,
      nextPageIndex:1,
      nextPageAvailable:true,
      currentQuery:"",
      suggestion: false,
      loading:false,
      landing:true,
      error:false, // false, "connection-error", "no-annales"
      annales:[],
      annalesDataSource: ds.cloneWithRows([])
    };

    this.launchQuery = this.launchQuery.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
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
          annalesDataSource: this.ds.cloneWithRows(newAnnales),
          nextPageAvailable:response.next_page ? true : false
        });
        this.setState((state) => {
          return {nextPageIndex: state.nextPageIndex + 1};
        });
      } else if(response.total_count == 0){ // Il n'y pas d'annales avec cette recherche
        this.setState({
          error:"no-annales-found"
        });
      }
      this.setState({
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
      annalesDataSource: this.ds.cloneWithRows(newAnnales)
    });

    AnnalesApi
    .fetchAnnale(this.state.annales[annaleIndex].id)
    .then((response) => {
      // Insert the details in state
      let newAnnales = this.state.annales.slice(0);
      newAnnales[annaleIndex].details = response.document;
      this.setState({
        annales:newAnnales,
        annalesDataSource: this.ds.cloneWithRows(newAnnales)
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  clearAnnales () {
    this.setState(() => {
      return {
        annales:[],
        annalesDataSource: this.ds.cloneWithRows([]),
        suggestion:false,
        error:false,
        nextPageIndex:1,
        nextPageAvailable:true
      };
    });
  }

  launchQuery (query) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.clearAnnales();
    this.getAnnalesPage(query,1);
    this.setState({
      currentQuery:query
    });
    this.setState({landing:false})
  }

  loadNextPage () {
    if(this.state.nextPageIndex > 1 && !this.state.loading) {
      this.getAnnalesPage(this.state.currentQuery,this.state.nextPageIndex);
    }
  }

  render () {
    if(this.state.loggedIn) {
      return (
        <View style={styles.wrapper}>
          <AnnalesSearch
            launchQuery={this.launchQuery}

            currentQuery={this.state.currentQuery}
            landing={this.state.landing}
            loading={this.state.loading}
            />
          <AnnalesResults
            launchQuery={this.launchQuery}
            loadNextPage={this.loadNextPage}
            getAnnaleDetail={this.getAnnaleDetail}

            annalesDataSource={this.state.annalesDataSource}
            suggestion={this.state.suggestion}
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
