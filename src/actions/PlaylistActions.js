/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Spotify from 'spotify-web-api-js';
import { getUserData, refreshTokensIfExpired, seeds } from '../assets/scripts/spotify';

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

  const { name, imageUrl, imageBinary, emotion, degree } = values;

  console.log('val', values);

  // 12171401054
  const res = await spotify.createPlaylist(me.id, {
    name: `Shmood Presents: ${name}`,
  });

  await addPhotoToPlaylist(res.id, imageBinary);
  await fillPlaylist(res.id, values);
};

export const addPhotoToPlaylist = async (playlistId, imageData) => {
  spotify
    .uploadCustomPlaylistCoverImage(playlistId, imageData)
    .then(result => console.log(result))
    .catch(err => console.log('uh-oh', err));
};

export const fillPlaylist = async (playlistId, values) => {
  validateToken();
  const { emotion, degree } = values;
  const deg = degree > 0.5 ? 'high' : 'low';

  // console.log('emotion is: ', emotion);
  // console.log('degree is: ', degree);
  // console.log('seeds is: ', seeds);
  // console.log('seeds[emotion] is: ', seeds[emotion]);
  // console.log('seeds[emotion].degree[deg] is: ', seeds[emotion].degree[deg]);
  const options = seeds[emotion].degree[deg];

  let songs;
  spotify
    .getRecommendations(options)
    .then(async res => {
      console.log(res);
      const { tracks } = res;
      songs = tracks.map(track => track.uri);
      await spotify.addTracksToPlaylist(playlistId, songs);
    })
    .catch(err => console.log(err));
};
