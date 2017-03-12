'use strict';

import React from 'react';
import {UIManager} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Piwik from 'react-native-piwik';

import BottomNavigation from './BottomNavigation';
import NewsCard from './news/NewsCard';
import EventsList from './events/EventsList';
import AnnalesHome from './annales/AnnalesHome';
import RoomsTab from './rooms/RoomsTab';
import LoginPage from './LoginPage';
import Auth from '../libs/auth';

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='home' component={BottomNavigation} initial tabs hideNavBar unmountScenes>
      <Scene key='events' component={EventsList} title='Événements' hideNavBar />
      <Scene key='annales' component={AnnalesHome} title='Annales' hideNavBar />
      <Scene key='rooms' component={RoomsTab} title='Salles libres' hideNavBar />
      <Scene key='account' component={LoginPage} title='Mon compte' hideNavBar />
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

  componentDidMount () {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    Auth.configure();
    Piwik.initTracker('https://bde.esiee.fr/statistiques/piwik.php', 5);
    Piwik.trackScreen(`/events`, 'Événements');
    // Storage.clear();
  }
}

module.exports = App;
