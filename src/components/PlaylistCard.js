import React, { Component } from 'react';
import { Card, CardTitle, CardSubtitle, Media } from 'reactstrap';

const styles = {
  card: {
    width: '30em',
    height: '30em',
    margin: '10px',
    float: 'left',
    backgroundColor: '#282828',
    justifyContent: 'space-between',
  },
  cardTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 600,
  },
};

export default class PlaylistCard extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.playlist.images[0].url);
    const uriUnembedded = this.props.playlist.external_urls.spotify;
    const uriSplit = uriUnembedded.split('playlist');
    const uri = `${uriSplit[0]}embed/playlist${uriSplit[1]}`;
    this.state = {
      uri,
      img: this.props.playlist.images[0].url,
    };
  }

  render() {
    const { playlist } = this.props;
    const { uri } = this.state;
    const { card, cardTitle } = styles;

    return (
      <Card style={card}>
        <CardTitle style={cardTitle}>{playlist.name}</CardTitle>

        {/* <img src= alt="" /> */}
        <Media>
          <Media object src={playlist.images[0].url} alt="Generic placeholder image" width="100%" height="100%" />
        </Media>

        {/* <CardSubtitle>{this.state.uri}</CardSubtitle> */}
        <iframe
          title={uri}
          src={uri}
          width="100%"
          height="100px"
          frameBorder="0"
          allowTransparency="true"
          allow="encrypted-media"
        />
      </Card>
    );
  }
}
