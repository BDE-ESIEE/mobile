'use strict';

import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import EventsList from './events/EventsList';
import AnnalesHome from './annales/AnnalesHome';

class TopNavigation extends React.Component {
  render () {
    return (
      <ScrollableTabView
        tabBarUnderlineColor='#fff'
        tabBarBackgroundColor='#ef476f'
        tabBarActiveTextColor='#fff'
        tabBarInactiveTextColor='#fff'
      >
        <EventsList tabLabel='Evenements' />
        <AnnalesHome tabLabel='Annales' />
      </ScrollableTabView>
    );
  }
}

module.exports = TopNavigation;
