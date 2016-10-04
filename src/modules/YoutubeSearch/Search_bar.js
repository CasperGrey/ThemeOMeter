import React, { Component } from "react"
import TextField from 'material-ui/TextField';


export default class Search_bar extends Component{
    constructor(props){
        super(props);
        this.state = {term:''};
    }


    render(){
        return(
            <div className="search-bar">
               <TextField
                    autofocus ={true}
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
