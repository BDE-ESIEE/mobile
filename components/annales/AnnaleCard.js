import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// import styles from '../styles/events.js'
import { Card } from 'react-native-material-design';

class AnnaleCard extends Component {
  render () {
    return (
      <View >
        <Card>
          {/* <Card.Media
              image={<Image source={{uri:item.image}} />}
              overlay
          /> */}
          <Card.Body>
            <Text style={{fontWeight: 'bold', color: '#000'}}>{this.props.annale.subject}</Text>
            <Text>{this.props.annale.teacher}</Text>
            <Text>{this.props.annale.unit}</Text>
            <Text>{this.props.annale.year}</Text>
          </Card.Body>
        </Card>
      </View>
    );
  }
}

module.exports = AnnaleCard;
