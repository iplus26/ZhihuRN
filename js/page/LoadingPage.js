'use strict';

import React, { Component, } from 'react'
import { View, } from 'react-native'
import Spinner from 'react-native-spinkit'

import { Tool, Config, } from '../utils'

class LoadingPage extends Component {
    render() {
        return (
            <View style={ { width: Tool.getDeviceWidth(), alignItems: 'center', } }>
              <Spinner isVisible={ true } type='Bounce' color={ Config.BASE_COLOR } />
            </View>
        );
    }
}

module.exports = LoadingPage;