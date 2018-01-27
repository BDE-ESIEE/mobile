import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import {Actions} from 'react-native-router-flux';
import styles from '../styles/news.js';

// import styles from '../styles/events.js'
import { Button, Card } from 'react-native-material-design';

class NewsCard extends Component {
  render () {
    let start = moment(this.props.post.created_at);
    let entireDateString = start.format('[Le] D MMMM [à] HH[h]mm');
    moment.locale('fr');
    let squareColor;
    squareColor = "transparent";
    let abstract = this.props.post.abstract.replace(/(\r\n|\n|\r)/gm,"");
    if(abstract.length > 210) {
     abstract = abstract.substring(0, 210) + '...';
    }
    let photo;
    if(this.props.post.photo) {
      let url = this.props.post.photo.url_thumbnail;
        photo = (
        <Image
          style={{width: "95%", height: 100, marginTop: 7, marginBottom: 7}}
          source={{uri: url}}
        />
      );
    }
    return (
      <View >
        <View style={styles.newsCard}>
          <View style={{flexDirection: 'column', justifyContent:"center" , height: 80, backgroundColor: squareColor}}>
            <Text style={styles.newsCardDateSmall}>{start.format("dddd")}</Text>
            <Text style={styles.newsCardDateNumber}>{start.date()}</Text>
            <Text style={styles.newsCardDateSmall}>{start.format("MMMM")}</Text>
          </View>
          <View style={{height: 230, flex: 1, overflow:"hidden", paddingTop: 10}}>
              <Text style={styles.NewsCardTitle}>{this.props.post.title}</Text>
              {photo}
              <Text style={styles.NewsCardDetail}>{abstract}</Text>
              <Text style={styles.NewsCardDetail}>{this.props.post.entireDateString}</Text>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = NewsCard;
