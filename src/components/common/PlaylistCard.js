import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Column, Card,
  CardHeader, Image, CardContent, Media, MediaLeft, Title, Subtitle,
  CardHeaderTitle, CardHeaderIcon, Icon, CardImage, Content, MediaContent,
} from 'bloomer';
import Helmet from 'react-helmet';

export default class PlaylistCard extends Component {
  constructor(props) {
    super(props);

    const uriUnembedded = this.props.playlist.external_urls.spotify;
    const uriSplit = uriUnembedded.split('playlist');
    const uri = `${uriSplit[0]}embed/playlist${uriSplit[1]}`;

    let imgUrl;

    if (this.props.playlist.images && this.props.playlist.images.length > 0) {
      imgUrl = this.props.playlist.images[0].url;
    } else {
      imgUrl = 'https://i.kinja-img.com/gawker-media/image/upload/s--ypN6iH9q--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/zrarqnhmkoaihvzss5ek.jpg';
    }

    this.state = {
      uri,
      imgUrl,
    };
  }

  render() {
    const { playlist, colSize } = this.props;
    const { uri, imgUrl } = this.state;

    return (
      <Column isSize={colSize}>
        <Card>
          <CardHeader>
            <CardHeaderTitle>{playlist.name}</CardHeaderTitle>
            <CardHeaderIcon>
              <Icon className="fa fa-angle-down" />
            </CardHeaderIcon>
          </CardHeader>
          <CardImage>
            <Link to={`/playlist/${playlist.id}`}>
              <Image isRatio="4:3" src={imgUrl} alt="Playlist picture" />
            </Link>
          </CardImage>
          <CardContent isPaddingless isMarginless>
            {/* <Media>
              <MediaLeft>
                <Image isSize="48x48" src="https://via.placeholder.com/96x96" />
              </MediaLeft>
              <MediaContent>
                <Title isSize={4}>{playlist.name}</Title>
                <Subtitle isSize={6}>{}</Subtitle>
              </MediaContent>
            </Media> */}
            <Content isMarginless isPaddingless>
              {playlist.description}
              {/* <br />
              <small>11:09 PM - 30 October 2014</small> */}
              <iframe title={uri} src={uri} width="100%" height="50px" frameBorder="0" allow="encrypted-media" />
            </Content>
          </CardContent>
        </Card>
      </Column>
    );
  }
}
