/**
 * Created by johnstonb on 14/07/2016.
 */
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ThemeScoringPage.scss';
import RaisedButton from 'material-ui/RaisedButton';
const title = 'Song Entry';

class ThemeScoringPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p>...</p>
        </div>
        <RaisedButton label="Go" />
      </div>
    );
  }

}

export default withStyles(ThemeScoringPage, s);
