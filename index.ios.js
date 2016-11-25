/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import ListPage from './js/page/ListPage'

export default class ZhihuRN extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ListPage,
          title: '知乎段子',
        }}
        style={{flex: 1}}
      />
    );
  }
}

AppRegistry.registerComponent('ZhihuRN', () => ZhihuRN);
