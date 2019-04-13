/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Spotify from 'spotify-web-api-js';
import { getUserData, refreshTokensIfExpired } from '../assets/scripts/spotify/auth';

const spotify = new Spotify();

const validateToken = () => {
  refreshTokensIfExpired();
  spotify.setAccessToken(getUserData('spotifyAccessToken'));
};

// Creates and adds image to playlist.
export const createPlaylist = async values => {
  validateToken();

  spotify.setAccessToken(getUserData('spotifyAccessToken'));

  // need err handling.
  const me = await spotify.getMe();

  const { name, imageUrl, imageBinary } = values;

  console.log('val', values);

  // 12171401054
  const res = await spotify.createPlaylist(me.id, {
    name: `Shmood Presents: ${name}`,
  });

  const playlistId = res.id;
  const imageData = imageBinary;

  spotify
    .uploadCustomPlaylistCoverImage(playlistId, imageData)
    .then(result => console.log(result))
    .catch(err => console.log('uh-oh', err));

  // @TODO: fill playlist based on recommendations from seeds.
};
