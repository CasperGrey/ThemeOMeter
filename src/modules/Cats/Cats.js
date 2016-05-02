import React, { Component } from 'react'

class Cats extends Component {
  
	static defaultProps = { 
		cats: [],
	};

  render() {
  	return <div>
    	<h1>Cats</h1>
    	{this.props.cats.map(cat => {
    		return <div>
    			<h4>{cat}</h4>
  			</div>
    	})}
    </div>
  }
}

Cats.needs = (props, store) => {
	// Could dispatch an action like this
  //return store.dispatch(fetchCats())
  // Instead we'll keep it simple and just return some async props
  return Promise.resolve()
	.then(() => {
    // Could get our now populated state after dispatching the action like this
		// var state = store.getState()
		return {
			cats: ['Fluffy', 'Mittens', 'Spike'],
		}
	})
}


export default Cats