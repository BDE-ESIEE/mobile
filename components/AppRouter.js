'use strict';

import React from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import TopNavigation from './TopNavigation';

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='home' component={TopNavigation} initial />
  </Scene>
);

class AppRouter extends React.Component {
  render () {
    return (
      <Router scenes={scenes} hideNavBar />
    );
  }
}

module.exports = AppRouter;
