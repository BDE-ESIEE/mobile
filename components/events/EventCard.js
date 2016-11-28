import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from '../styles/events.js'
import { Button, Card } from 'react-native-material-design';

class EventCard extends Component {
  render() {
    return (
      <View >
          <Card>
              {/*<Card.Media
                  image={<Image source={{uri:item.image}} />}
                  overlay
              />*/}
              <Card.Body>
                  <Text style={{fontWeight: "bold", color:"#000"}}>{this.props.event.title}</Text>
                    <Text>Début : {this.props.event.start}</Text>
                    <Text>Fin : {this.props.event.end}</Text>

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
