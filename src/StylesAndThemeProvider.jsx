import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
  palette: {},
});

class Main extends React.Component {

  constructor(props, context){
    super(props, context)
  }

  static childContextTypes = {
    insertCss: Proptypes.func,
  };


  getChildContext() {
    return { 
      insertCss: this.props.insertCss,
    }
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
       {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default (Main)