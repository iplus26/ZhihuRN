'use strict';

let React = require('react-native');
let {LinkingIOS,
    Touchablehighlight,
    Text, } = React;

// let SafariView = require('react-native-safari-view');

let Tool = {

    // transform a parameter object into string  
    param: function(obj) {
        let str = [];
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    },

    // openURL: function(url, callback, readerMode) {
    //     if (url === null && callback) {
    //         callback();
    //     } else {
    //         SafariView.isAvailable()
    //             .then(available => SafariView.show({
    //                 url: url,
    //                 readerMode: readerMode,
    //                 tintColor: require('./Config').BASE_COLOR,
    //             }));
    //     }
    // },

    getDeviceWidth: function() {
        return React.Dimensions.get('window').width;
    },
    getDeviceHeight: function() {
        return React.Dimensions.get('window').height;
    }
};

module.exports = Tool;