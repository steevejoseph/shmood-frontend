/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import {
  IMGUR_PHOTO_ADD_PENDING,
  IMGUR_PHOTO_ADD_SUCCESS,
  IMGUR_PHOTO_ADD_FAIL,
  SUBMIT_PHOTO_URL,
  SUBMIT_PHOTO_URL_SUCCESS,
  SUBMIT_PHOTO_URL_FAIL,
  CURRENT_PHOTO_CHANGED,
} from './types';

import { createPlaylist } from './PlaylistActions';

const API_URL = process.env.REACT_APP_API_URL;

export const getImgurUrl = data => dispatch => {
  console.log(JSON.stringify(data.get('photo')));
  dispatch({ type: IMGUR_PHOTO_ADD_PENDING });

  axios
    .post(`${API_URL}/imgur/upload`, { data })
    .then(res => {
      console.log('rez', res);
      dispatch({
        type: IMGUR_PHOTO_ADD_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('Could not upload to Imgur', err);
      dispatch({ type: IMGUR_PHOTO_ADD_FAIL });
    });
};

export const submitPhotoUrl = values => dispatch => {
  dispatch({
    type: SUBMIT_PHOTO_URL,
  });

  const { imageUrl } = values;

  // @feature should add in a check for what happens if there's no faces in picture.
  axios
    .post(`${API_URL}/azure/submit`, { imageUrl })
    .then(res => {
      console.log(res);
      dispatch({
        type: SUBMIT_PHOTO_URL_SUCCESS,
        payload: res.data,
      });

      values.imageBinary = res.data.imageBinary;
      values.emotion = res.data.emotion;
      values.degree = res.data.degree;
      dispatch(createPlaylist(values));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SUBMIT_PHOTO_URL_FAIL,
      });
    });
};

// @refactor: May need to get rid of artifacts of currentPhotoUrl's reduxification.
export const photoUrlChanged = values => ({
  type: CURRENT_PHOTO_CHANGED,
  payload: values.currentPhotoUrl,
});
