import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton';
import Form from '../Form.js';

var EntryForm = React.createClass({
    getInitialState: function() {
        return {item: ''};
    },
    handleSubmit: function(e){
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({item: ''});
        ReactDOM.findDOMNode(this.refs.item).focus();
        return;
    },
    onChange: function(e){
        this.setState({
            item: e.target.value });
    },
    render: function(){
        return (
            <Form>
                <input type='text' ref='item' onChange={this.onChange} value={this.state.item}/>
                <RaisedButton
                    secondary={true}
                    label="Add"
                    onTouchTap={this.handleSubmit}
                />
            </Form>
        );
    }
});

export default EntryForm