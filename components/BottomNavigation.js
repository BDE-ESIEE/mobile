'use strict';

import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {DefaultRenderer} from 'react-native-router-flux';
import TabBar from './TabBar';

class BottomNavigation extends React.Component {
  render () {
    const props = this.props;

    return (
      <ScrollableTabView
        tabBarPosition='bottom'
        locked={true}
        renderTabBar={() => <TabBar />}
      >
        {
          props.navigationState.children.map(el => {
            return (
              <DefaultRenderer navigationState={el} onNavigate={props.onNavigate} key={el.key} {...el} tabLabel={el.title} />
            );
          })
        }
      </ScrollableTabView>
    );
  }
}

module.exports = BottomNavigation;
