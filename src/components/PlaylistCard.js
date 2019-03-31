import React, { Component } from 'react';
import { Card } from '@material-ui/core';

const styles = {
  cardStyle: {
    width: '30em',
    height: '30em',
    margin: '10px',
    float: 'left',
    backgroundColor: 'orange',
  },
};

export default class PlaylistCard extends Component {
  render() {
    const { playlist } = this.props;
    const { cardStyle } = styles;
    return <Card style={cardStyle}>{playlist.name}</Card>;
  }
}
