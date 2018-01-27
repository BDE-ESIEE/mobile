import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import styles from '../styles/news.js';
import NewsCard from './NewsCard';

import { ifIphoneX } from 'react-native-iphone-x-helper'

const loadingMessages = [
  "Le chien du BDE livre les journaux...",
  "Ca va toujours plus vite que si t'allais voir le site."
]

class NewsList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      news: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      page: 1,
      data: [],
      fetching: false,
      refreshing: false,
      json: {},
      loading: true
    };
  }
  componentWillMount() {
    this._fetchMore(this.state.page);
  }
  _onRefresh() {
    if (this.state.refreshing) {
      return;
    }
    this.setState({refreshing: true, page: 1});
    let promise = this._fetchMore(1);
    if (!promise) {
      return;
    }
    promise.then(() => this.setState({refreshing: false}));
  }
  _fetchMore(page) {
    if (this.state.fetching) {
      return;
    }
    this.setState({fetching: true});
    var rows = [];
    fetch('https://bde.esiee.fr/api/posts.json?page='+page+'&count=10&_format=json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      response.json().then((json) => {
        for (var i = 0; i < json.entries.length; i++) {
          rows.push(json.entries[i]);
        }
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(rows);
          }, 3);
        })
        .then((rows) => {
          var data;
          if (this.state.refreshing) {
            data = rows;
          } else {
            data = [...this.state.data, ...rows];
          }
          this.setState({
            page: page + 1,
            news: this.state.news.cloneWithRows(data),
            data: data,
            fetching: false,
            loading: false,
            refreshing: false
          });
        });
      });
    });
  }

  render () {
    let loadingElement;
    let listElement;
    if (this.state.loading) {
      let loadingText = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      loadingElement = (
        <View style={styles.loading}>
          <ActivityIndicator color="#1D976C" size="large" style={styles.loadingIndicator}/>
          <Text style={styles.loadingText}>
            {loadingText}
          </Text>
        </View>
      );
    } else {
      listElement = (
        <ListView
          dataSource={this.state.news}
          renderRow={(post, sectionID, rowID) => <NewsCard post={post} row={rowID} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor={'#1D976C'}
            />
          }
          onEndReached={() => this._fetchMore(this.state.page)}
        />
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0.2)" barStyle="light-content"/>
          <View>
            <LinearGradient
              start={{x: 0.0, y: 0}} end={{x: 1, y: 1}}
              colors={['#1D976C', '#1D976C']}
              style={styles.topBar}>
              <TouchableOpacity></TouchableOpacity>
              <Text style={styles.topBarText}>
                <Text style={styles.topBarNormalText}>News</Text>
              </Text>
              <TouchableOpacity></TouchableOpacity>
            </LinearGradient>
          </View>
        {loadingElement}
        {listElement}
      </View>
    );
  }
}

module.exports = NewsList;
