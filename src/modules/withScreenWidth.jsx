import React, { Component } from 'react'

export default function withScreenWidth(ComposedComponent) {
  return class WithScreenWidth extends Component {

    constructor() {
      super();

      this.state = {
        screenWidth: global.innerWidth,
      };
    }

    componentDidMount() {
      global.addEventListener('resize', this.handleWindowResize);
      global.addEventListener('orientationchange', this.handleWindowResize);
      
    }

    componentWillUnmount() {
      global.removeEventListener('resize', this.handleWindowResize);
      global.removeEventListener('orientationchange', this.handleWindowResize); 
    }

    render() {
      return <ComposedComponent {...this.props} screenWidth={this.state.screenWidth}/>;
    }

    handleWindowResize = (value) => {
      this.setState({screenWidth: global.innerWidth});
    }

  };
}