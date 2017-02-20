import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import {Actions} from 'react-native-router-flux';
import styles from '../styles/events.js';

// import styles from '../styles/events.js'
import { Button, Card } from 'react-native-material-design';


class EventCard extends Component {
  render () {
    let start = moment(this.props.event.start);
    let end = moment(this.props.event.end);
    let entireDateString = '';
    moment.locale('fr');

    if (start.isSame(end, 'day')) {
      entireDateString = start.format('[Le] D MMMM [de] HH[h]mm') + end.format(' [à] HH[h]mm');
    } else {
      entireDateString = start.format('[Du] D MMMM HH[h]mm') + end.format(' [au] D MMMM HH[h]mm');
    }
    let squareColor;
    if(this.props.row%3 == 0) {
      squareColor = "#b9e3c6";
    } else if (this.props.row%3 == 2) {
      squareColor = "#59c9a5";
    } else {
      squareColor = "#d81e5b";
    }
    squareColor = "transparent";
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
        <View style={styles.eventCard}>
          <View style={{flexDirection: 'column', justifyContent:"center" , height: 80, backgroundColor: squareColor}}>
            <Text style={styles.eventCardDateSmall}>{start.format("dddd")}</Text>
            <Text style={styles.eventCardDateNumber}>{start.date()}</Text>
            <Text style={styles.eventCardDateSmall}>{start.format("MMMM")}</Text>
          </View>
          <View style={{height: 70, flex: 1, overflow:"hidden", paddingTop: 10}}>
              <Text style={styles.EventCardTitle}>{this.props.event.title}</Text>
              <Text style={styles.EventCardDetail}>{entireDateString}</Text>
              <Text style={styles.EventCardDetail}>{this.props.event.place}</Text>
          </View>
          {/*<View style={{flexDirection: 'row', alignItems:'center', paddingRight:10}}>
              <Text></Text>
          </View>*/}
        </View>
      </View>
    );
  }
}

module.exports = EventCard;
