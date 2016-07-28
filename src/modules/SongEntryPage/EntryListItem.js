import React, { Component, PropTypes } from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import { ListItem } from 'material-ui/List'

var EntryListItem = React.createClass({

/*    removeVideo(e){
        this.props.setState();
    }*/

    render: function(){
      return <ListItem
        primaryText= 'Test1'
        leftCheckbox={<Checkbox
          defaultChecked={true}
        />}
        rightIconButton={<IconButton tooltip="Remove">
          <Close color='Red'/>
        </IconButton>}
      >
        {this.props.children}
      </ListItem>    
    }
});

export default EntryListItem