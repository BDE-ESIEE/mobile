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
    if (this.props.newsId) {
      this.fetchNews();
    } else if (this.props.news) {
      this.setState({
        loading: false
      });
    }
  }

  fetchNews () {
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

    let news = (this.props.news ? this.props.news : this.state.news);

    let image;

    if (news.photo.url_thumbnail) {
      image = (
        <Card.Media
          image={<Image source={{uri: news.photo.url_thumbnail}} />}
          overlay
        />
      );
    }

    return (
      <View >
        <Card>
          {image}
          <Card.Body>
            <Text style={{fontWeight: 'bold', color: '#000'}}>{news.title}</Text>
            <HTMLView
              value={news.content}
            />
          </Card.Body>
        </Card>
      </View>
    );
  }
}

module.exports = NewsCard;
