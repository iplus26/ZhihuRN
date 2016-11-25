import React, { Component } from 'react';
import { WebView, Text } from 'react-native';

class DetailPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <WebView style={{ paddingTop: 64 }}
                source={{ uri: this.props.data.url }}
            />
        )
    }
}

module.exports = DetailPage;