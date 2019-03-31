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
  constructor(props){
    super(props);

    const uri_unembedded = this.props.playlist.external_urls.spotify;
    const uri_split = uri_unembedded.split("playlist");
    const uri = `${uri_split[0]}embed/playlist${uri_split[1]}`;

    this.state = { uri, };
  }

  render() {
    const { playlist } = this.props;
    const{ uri } = this.state;
    const { cardStyle } = styles;

    return <Card style={cardStyle}>
    {playlist.name}dd{this.state.uri}dd{Math.random(100)}
    <iframe src={uri} width={'100%'} height={'100%'} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </Card>;
  }
}
