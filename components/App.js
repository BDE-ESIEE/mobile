'use strict';

import React from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import BottomNavigation from './BottomNavigation';
import NewsCard from './news/NewsCard';
import EventsList from './events/EventsList';
import AnnalesHome from './annales/AnnalesHome';

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='home' component={BottomNavigation} initial tabs hideNavBar>
      <Scene key='events' component={EventsList} title='Événements' hideNavBar />
      <Scene key='annales' component={AnnalesHome} title='Annales' hideNavBar />
    </Scene>
    <Scene key='news' component={NewsCard} title='News' hideNavBar={false} />
  </Scene>
);

class App extends React.Component {
  render () {
    return (
      <Router scenes={scenes} />
    );
  }
}

module.exports = App;
