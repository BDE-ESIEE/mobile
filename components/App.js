'use strict';

import React from 'react';
import {UIManager} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
//import Piwik from 'react-native-piwik';

import BottomNavigation from './BottomNavigation';
import NewsList from './news/NewsList';
import EventsList from './events/EventsList';
import Annales from './annales/Annales';
import RoomsTab from './rooms/RoomsTab';
import AgendaTab from './agenda/AgendaTab';
import LoginPage from './LoginPage';
import Auth from '../libs/auth';

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='home' component={BottomNavigation} initial tabs hideNavBar unmountScenes>
      <Scene key='news' component={NewsList} title='News' hideNavBar />
      <Scene key='agenda' component={AgendaTab} title='Agenda' hideNavBar />
      <Scene key='annales' component={Annales} title='Annales' hideNavBar />
      <Scene key='rooms' component={RoomsTab} title='Salles libres' hideNavBar />
      <Scene key='account' component={LoginPage} title='Compte' hideNavBar />
    </Scene>
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
    //Piwik.initTracker('https://bde.esiee.fr/statistiques/piwik.php', 5);
    // TODO FIXME Reenable piwik
    //Piwik.trackScreen(`/events`, 'Événements');
    // Storage.clear();
  }
}

module.exports = App;
