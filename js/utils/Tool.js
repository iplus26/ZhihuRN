'use strict';

let { Dimensions } = require('react-native');
let Tool = {
    getDeviceWidth: function() {
        return Dimensions.get('window').width;
    },
    getDeviceHeight: function() {
        return Dimensions.get('window').height;
    }
};

module.exports = Tool;