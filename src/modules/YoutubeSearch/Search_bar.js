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
               <input
                    className ="search-term"
                    value = {this.state.term}
                    onChange = {(event) => this.onInputChange(event.target.value)}
                />
            </div>
        );
    }
    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }
}
