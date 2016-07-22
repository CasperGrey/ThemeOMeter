import React, { Component } from "react"
import Text from '../Text.js'

export default class Search_bar extends Component{
    constructor(props){
        super(props);
        this.state = {term:''};
    }
    render(){
        return(
            <div className="search-bar">
               <Text
                    className ={"search-term"}
                    name="Youtube Search Entry"
                    placeholder="Youtube URL"
                    label="URLEntry"/>
                    value = {this.state.term}
                    onChange = { (event) => this.onInputChange(event.target.value)}
                />
            </div>
        );
    }
    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }
}
