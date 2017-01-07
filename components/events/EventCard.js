import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';

import styles from '../styles/events.js'
import { Button, Card } from 'react-native-material-design';

class EventCard extends Component {
  render() {
    let start = moment(this.props.event.start);
    let end = moment(this.props.event.end);
    let eventDate = '';
    moment.locale('fr');

    if (start.isSame(end, 'day')) {
        eventDate = start.format('[Le] D MMMM [de] HH[h]mm') + end.format(' [à] HH[h]mm');
    } else {
        eventDate = start.format('[Du] D MMMM HH[h]mm') + end.format(' [au] D MMMM HH[h]mm');
    }

    return (
      <View >
          <Card>
              {/*<Card.Media
                  image={<Image source={{uri:item.image}} />}
                  overlay
              />*/}
              <Card.Body>
                  <Text style={{fontWeight: "bold", color:"#000"}}>{this.props.event.title}</Text>
                  <Text>{eventDate}</Text>
              </Card.Body>
              <Card.Actions position="right">
                  {/*<Button text="VOIR" onPress={this.openLink.bind(this,item.link)} overrides={{textColor: "#000"}} />*/}
                  <Button text="VOIR" overrides={{textColor: "#000"}} />
              </Card.Actions>
          </Card>
      </View>
    );
  }
}

module.exports = EventCard;
