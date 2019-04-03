import {
  SUBMIT_PHOTO_URL,
  SUBMIT_PHOTO_URL_SUCCESS,
  SUBMIT_PHOTO_URL_FAIL,
  CURRENT_PHOTO_CHANGED, // @refactor: May need to get rid of artifacts of currentPhotoUrl's reduxification.
} from '../actions/types';

const INITIAL_STATE = {
  currentPhotoUrl: '', // @refactor: May need to get rid of artifacts of currentPhotoUrl's reduxification.

  photoBeingSubmitted: false,
  photoAnalysis: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_PHOTO_URL:
      return { ...state, photoBeingSubmitted: true };
    case SUBMIT_PHOTO_URL_SUCCESS:
      return { ...state, photoBeingSubmitted: false, photoAnalysis: action.payload };
    case SUBMIT_PHOTO_URL_FAIL:
      return { ...state, photoBeingSubmitted: false };
    case CURRENT_PHOTO_CHANGED: // @refactor: May need to get rid of artifacts of currentPhotoUrl's reduxification.
      return { ...state, currentPhotoUrl: action.payload };
    default:
      return state;
  }
};
