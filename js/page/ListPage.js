import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight, ActionSheetIOS } from 'react-native';
import LoadingPage from './LoadingPage';
import DetailPage  from './DetailPage';

// Cheerio without node core modules. 
import cheerio from '../lib/cheerio-bundle.js';

class ListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loaded: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let sel = this;
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        fetch('https://www.zhihu.com/topic/19585537/hot')
            .then(function(resp) {
                if (resp.ok) {
                    resp.text().then(function(html) {
                        let $ = cheerio.load(html);
                        let answers = $('div.feed-item'),
                            data = [];
                        answers.each(function(index, el) {
                            let $ = cheerio.load(el);
                            data.push({
                                title: $('h2').text().trim(),
                                author: $('.author-link-line').text().trim(),
                                bio: $('.bio').text().trim(),
                                content: $('.zm-item-rich-text .summary').text().replace('\n显示全部', '').trim(),
                                url: 'https://zhihu.com' + $('.question_link').attr('href')
                            });
                        });

                        sel.setState({
                            loaded: true,
                            dataSource: ds.cloneWithRows(data)
                        });
                    });
                } else {
                    console.log('Network response was not ok.');
                }
            })
            .catch(function(error) {
                // Promise Rejection
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }

    onForward(item, nextRoute) {
        this.props.navigator.push(nextRoute);
    }

    showShareActionSheet(item) {
        ActionSheetIOS.showShareActionSheetWithOptions({
            url: item.url,
            message: 'message to go with the shared url',
            subject: 'a subject to go in the email heading',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        },
            (error) => alert(error),
            (success, method) => {
                var text;
                if (success) {
                    text = `Shared via ${method}`;
                } else {
                    text = 'You didn\'t share';
                }
                this.setState({
                    text
                });
            });
    }

    renderRow(item) {
        const nextRoute = {
            title: item.title,
            component: DetailPage,
            passProps: {
                data: item
            },
            rightButtonTitle: '分享',
            onRightButtonPress: () => this.showShareActionSheet(item)
        }
        return (
            <TouchableHighlight onPress={ () => this.onForward(item, nextRoute) }
                                underlayColor='#fff'>
            <View style={ style.rowview }>
              <Text style={ [style.text, style.title] }>{ item.title }</Text>
                <Text style={ style.text }>
                    <Text>{ item.author }</Text>{ item.bio ? '，' : ''}
                    <Text style={ [style.text, style.bio] }>{ item.bio }</Text>
                </Text>
                <Text style={style.text}>{ item.content }</Text>
            </View>
            </TouchableHighlight>
            );
    }

    render() {
        if (this.state.loaded) {
            return (
                <ListView style={ style.listview }
                          dataSource={ this.state.dataSource }
                          renderRow={ (item) => this.renderRow(item) } />);
        } else {
            return <LoadingPage />;
        }
    }
}

let style = StyleSheet.create({
    listview: {
        paddingTop: 64,
    },
    rowview: {
        paddingTop: 10,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
    },
    title: {
        fontSize: 17,
        fontWeight: '700'
    },
    bio: {
        color: '#999'
    }
});

module.exports = ListPage;