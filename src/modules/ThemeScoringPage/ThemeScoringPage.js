/**
 * Created by johnstonb on 14/07/2016.
 */
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ThemeScoringPage.css';
import RaisedButton from 'material-ui/RaisedButton';
const title = 'Score Page';

class ThemeScoringPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  // componentWillMount() {
  //   this.context.onSetTitle(title);
  // }

  render() {
    return (
      <div className={"scoreroot"}>
        <div className={"scorecontainer"}>
          <h1>{title}</h1>
          <p>...</p>
        </div>
        <RaisedButton label="Go" />
      </div>
    );
  }

}

export default withStyles(s)(ThemeScoringPage);
