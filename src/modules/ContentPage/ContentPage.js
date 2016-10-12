/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContentPage.css';
import {Card, CardActions, CardTitle, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import {StyleSheet} from 'react-look'
import LoginContainer from './../LoginPage/LoginPageContainer'
const title = 'Song Entry';


class ContentPage extends Component {

    action = '';

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    handleChange = (event, index, value) => this.setState({value});


    render() {
        console.log('home props', this.props.login.user)
        var action;
        if (this.props.login.user) {
            action =  <CardActions>
                <RaisedButton secondary={true} label="Song Entry" href='/entry'/>
                <RaisedButton primary={true} label="Score Theme" href='score'/>
            </CardActions>;
        } else {
            action = <LoginContainer/>;
        }

        return (
            <div className="root">
                <div className={styles.containerStyle}>
                    {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
                    <div dangerouslySetInnerHTML={{__html: this.props.content || ''}}/>
                    <Paper zDepth={3}>
                        <Card className={styles.cardStyle}>
                            <CardMedia className={styles.img}>
                                <img src="/james-jean-talib.jpg"/>
                            </CardMedia>
                            <CardTitle title="Theme O" subtitle="2016"/>
                            <Subheader>Where would you like to go</Subheader>
                            <Divider/>

                            {action}

                        </Card>
                    </Paper>
                </div>
            </div>
        );
    }
}
ContentPage.propTypes = {
//    user: React.PropTypes.any.isRequired
};

const styles = StyleSheet.create({

    root: {
        margin: '0 auto',
    },
    containerStyle: {
        margin: '0 auto',
        padding: '0 0 40',
        maxWidth: '500',
        textAlign: 'center',

    },

    cardStyle: {

        maxWidth: '500',
        textAlign: 'center',

    },

    img: {
        display: 'inline-flex',
        maxWidth: '100%',
        maxHeight: '100%',
        height: 'auto',
        width: 'auto', /* ie8 */
    },

    facebooklogin: {
        minWidth: '150px'
    }

})

export default withStyles(s)(ContentPage)
