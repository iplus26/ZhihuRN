'use strict';

import React, { Component, } from 'react'
import { View, StyleSheet } from 'react-native'
import Spinner from 'react-native-spinkit'

import { Tool, Config, } from '../utils'

class LoadingPage extends Component {
    render() {
        return (
            <View style={ styles.container }>
              <Spinner isVisible={ true } type='Bounce' color={ Config.BASE_COLOR } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Tool.getDeviceWidth(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


module.exports = LoadingPage;