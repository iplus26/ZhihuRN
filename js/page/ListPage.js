import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import LoadingPage from './LoadingPage';

// Cheerio without node core modules. 
import cheerio from '../lib/cheerio-bundle.js';

class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let sel = this;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        fetch('https://www.zhihu.com/topic/19552521/hot')
            .then(function(resp) {
                if (resp.ok) {
                    resp.text().then(function(html) {
                        let $ = cheerio.load(html);
                        let answers = $('div.feed-item'), data = [];
                        answers.each(function(index, el) {
                            let $ = cheerio.load(el);
                            data.push({ 
                                title: $('h2').text().trim(),

                            })
                        })

                        sel.setState({
                            loaded: true,
                            dataSource: ds.cloneWithRows(data)
                        })
                    })
                } else {
                    console.log('Network response was not ok.');
                }
            })
            .catch(function(error) {
                // Promise Rejection
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }

    render() {
        if (this.state.loaded)
            return (
                <ListView
                    style={ style.listview }
                    dataSource={ this.state.dataSource }
                    renderRow ={function(item) {
                        return ( <Text style={ style.text }>{ item.title }</Text> )
                    }}
                />)
        else 
            return <LoadingPage />
    }
}

let style = StyleSheet.create({
    listview: {
        paddingTop: 20
    },
    text: {
        paddingTop: 10,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 10,
        lineHeight: 22,
        fontSize: 17
    }
});

module.exports = ListPage;