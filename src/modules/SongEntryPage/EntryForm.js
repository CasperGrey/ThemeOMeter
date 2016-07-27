import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton'

var EntryForm = React.createClass({
    getInitialState: function() {
        return {item: ''};
    },
    handleSubmit: function(e){
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({item: ''});
        React.findDOMNode(this.refs.item).focus();
        return;
    },
    onChange: function(e){
        this.setState({
            item: e.target.value });
    },
    render: function(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' ref='item' onChange={this.onChange} value={this.state.item}/>
                <RaisedButton
                    secondary={true}
                    label="Add"
                />
            </form>
        );
    }
});

export default EntryForm