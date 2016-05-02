import React, { Component } from 'react'

class Dogs extends Component {
  
	static defaultProps = { 
		dogs: ['Ralph', 'Paws', 'George'],
	};

  render() {
    return <div>
    	<h1>Dogs</h1>
    	{this.props.dogs.map(dog => {
    		return <div>
          <h4>{dog}</h4>
  			</div>
    	})}
    </div>
  }
}


export default Dogs