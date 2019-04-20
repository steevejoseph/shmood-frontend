/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Spotify from 'spotify-web-api-js';
import { getUserData, refreshTokensIfExpired, seeds } from '../assets/scripts/spotify';

import { history } from '../components/App';
import {
  PLAYLIST_GENERATION_STARTED,
  PLAYLIST_GENERATION_SUCCESS,
  PLAYLIST_GENERATION_FAIL,
  PLAYLIST_PHOTO_ADD_STARTED,
  PLAYLIST_PHOTO_ADD_SUCCESS,
  PLAYLIST_PHOTO_ADD_FAIL,
} from './types';

const spotify = new Spotify();

const validateToken = () => {
  refreshTokensIfExpired();
  spotify.setAccessToken(getUserData('spotifyAccessToken'));
};

// Creates and adds image to playlist.
export const createPlaylist = values => dispatch => {
  validateToken();
  spotify.setAccessToken(getUserData('spotifyAccessToken'));
  const { name, imageUrl, imageBinary, emotion, degree } = values;

  console.log('hello');
  dispatch({ type: PLAYLIST_GENERATION_STARTED });
  spotify
    .getMe()
    .then(me => {
      spotify
        .createPlaylist(me.id, { name: `Shmood Presents: ${name}` })
        .then(res => {
          dispatch(addPhotoToPlaylist(res.id, imageBinary));
          dispatch(fillPlaylist(res.id, values));
          setTimeout(() => {}, 1000);
          history.push(`/playlist/${res.id}`, { loading: true });
        })
        .catch(err => {
          console.log('Cannot create playlist', err);
          dispatch({ type: PLAYLIST_GENERATION_FAIL });
        });
    })
    .catch(err => {
      console.log('Cannot get "me"', err);
      dispatch({ type: PLAYLIST_GENERATION_FAIL });
    });
};

export const addPhotoToPlaylist = (playlistId, imageData) => dispatch => {
  dispatch({ type: PLAYLIST_PHOTO_ADD_STARTED });

  spotify
    .uploadCustomPlaylistCoverImage(playlistId, imageData)
    .then(res => {
      console.log(res);
      dispatch({ type: PLAYLIST_PHOTO_ADD_SUCCESS });
    })
    .catch(err => {
      console.log('Cannot add photo to playlist', err);
      dispatch({ type: PLAYLIST_PHOTO_ADD_FAIL });
    });
};

export const fillPlaylist = (playlistId, values) => dispatch => {
  validateToken();
  const { emotion, degree } = values;
  const deg = degree > 0.5 ? 'high' : 'low';
  const options = seeds[emotion].degree[deg];

  spotify
    .getRecommendations(options)
    .then(res => {
      console.log(res);
      const { tracks } = res;
      const songs = tracks.map(track => track.uri);
      spotify
        .addTracksToPlaylist(playlistId, songs)
        .then(result => {
          console.log(result);
          dispatch({ type: PLAYLIST_GENERATION_SUCCESS });
        })
        .catch('Cannot add tracks to playlists', err => {
          console.log(err);
          dispatch({ type: PLAYLIST_GENERATION_FAIL });
        });
    })
    .catch(err => {
      console.log('Cannot get recommendations', err);
      dispatch({ type: PLAYLIST_GENERATION_FAIL });
    });
};
