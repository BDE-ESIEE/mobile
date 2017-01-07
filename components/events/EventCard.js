import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import {Actions} from 'react-native-router-flux';

// import styles from '../styles/events.js'
import { Button, Card } from 'react-native-material-design';

class EventCard extends Component {
  render () {
    let start = moment(this.props.event.start);
    let end = moment(this.props.event.end);
    let eventDate = '';
    moment.locale('fr');

    if (start.isSame(end, 'day')) {
      eventDate = start.format('[Le] D MMMM [de] HH[h]mm') + end.format(' [à] HH[h]mm');
    } else {
      eventDate = start.format('[Du] D MMMM HH[h]mm') + end.format(' [au] D MMMM HH[h]mm');
    }

    let action;

    if (this.props.event.news_ids && this.props.event.news_ids.length > 0) {
      let goToNews = () => Actions.news({newsId: this.props.event.news_ids[0]});
      action = (
        <Card.Actions position='right'>
          <Button text='VOIR' onPress={goToNews} overrides={{textColor: '#000'}} />
        </Card.Actions>
      );
    }

    return (
      <View >
        <Card>
          {/* <Card.Media
              image={<Image source={{uri:item.image}} />}
              overlay
          /> */}
          <Card.Body>
            <Text style={{fontWeight: 'bold', color: '#000'}}>{this.props.event.title}</Text>
            <Text>{eventDate}</Text>
          </Card.Body>
          {action}
        </Card>
      </View>
    );
  }
}

module.exports = EventCard;
