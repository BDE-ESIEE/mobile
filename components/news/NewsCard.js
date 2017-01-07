import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import { Card } from 'react-native-material-design';

/* global fetch */
class NewsCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      news: {}
    };
  }

  componentDidMount () {
    this.getNews();
  }

  getNews () {
    fetch(`https://bde.esiee.fr/api/posts/${this.props.newsId}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      response.json().then((json) => {
        this.setState({
          loading: false,
          news: json
        });
      });
    });
  }

  render () {
    if (this.state.loading) {
      return (
        <Text>Loading...</Text>
      );
    }

    return (
      <View >
        <Card>
          <Card.Media
            image={<Image source={{uri: this.state.news.photo.url_thumbnail}} />}
            overlay
          />
          <Card.Body>
            <Text style={{fontWeight: 'bold', color: '#000'}}>{this.state.news.title}</Text>
            <HTMLView
              value={this.state.news.content}
            />
          </Card.Body>
        </Card>
      </View>
    );
  }
}

module.exports = NewsCard;
