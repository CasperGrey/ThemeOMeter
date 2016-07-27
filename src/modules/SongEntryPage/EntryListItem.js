import React, { Component, PropTypes } from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import ListItem from 'material-ui/List'

var EntryListItem = React.createClass({
    render: function(){
        return (
            <ListItem
                primaryText= 'Test1'
                leftCheckbox={
                    <Checkbox
                        value='1'
                        defaultChecked={true}
                    />}
                rightIconButton={
                    <IconButton tooltip="Remove"> <Close color = 'Red' /> </IconButton>}
                value = {this.props.children}
            />
        );
    }
});

export default EntryListItem