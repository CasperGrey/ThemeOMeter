
import React, { Component, PropTypes } from 'react';
import EntryListItem from './EntryListItem'
import List from 'material-ui/List'

var EntryList = React.createClass({
    render: function() {
        var createItem = function(itemText) {
            return (
                <EntryListItem>{itemText}</EntryListItem>
            );
        };
        return <List>{this.props.items.map(createItem)}</List>;
    }
});