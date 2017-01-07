'use strict';

import React from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import TopNavigation from './TopNavigation';
import NewsCard from './news/NewsCard';

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='home' component={TopNavigation} initial hideNavBar />
    <Scene key='news' component={NewsCard} />
  </Scene>
);

class AppRouter extends React.Component {
  render () {
    return (
      <Router scenes={scenes} />
    );
  }
}

module.exports = AppRouter;
