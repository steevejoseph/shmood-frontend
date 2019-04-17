import {
  PLAYLIST_GENERATION_STARTED,
  PLAYLIST_GENERATION_SUCCESS,
  PLAYLIST_GENERATION_FAIL,
  PLAYLIST_PHOTO_ADD_STARTED,
  PLAYLIST_PHOTO_ADD_SUCCESS,
  PLAYLIST_PHOTO_ADD_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  playlistBeingGenerated: false,
  playlistGenerationSuccess: false,
  playlistGenerationFail: false,
  playlistPhotoBeingAdded: false,
  playlistPhotoAddSuccess: false,
  playlistPhotoAddFail: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYLIST_GENERATION_STARTED:
      return { ...state, playlistBeingGenerated: true };
    case PLAYLIST_GENERATION_SUCCESS:
      return {
        ...state,
        playlistBeingGenerated: false,
        playlistGenerationSuccess: true,
        playlistGenerationFail: false,
      };
    case PLAYLIST_GENERATION_FAIL:
      return {
        ...state,
        playlistBeingGenerated: false,
        playlistGenerationSuccess: false,
        playlistGenerationFail: true,
      };

    case PLAYLIST_PHOTO_ADD_STARTED:
      return {
        ...state,
        playlistPhotoBeingAdded: true,
        playlistPhotoAddSuccess: false,
        playlistPhotoAddFail: false,
      };
    case PLAYLIST_PHOTO_ADD_SUCCESS:
      return {
        ...state,
        playlistBeingGenerated: false,
        playlistPhotoAddSuccess: true,
        playlistPhotoAddFail: false,
      };
    case PLAYLIST_PHOTO_ADD_FAIL:
      return {
        ...state,
        playlistBeingGenerated: false,
        playlistPhotoAddSuccess: false,
        playlistPhotoAddFail: true,
      };
    default:
      return state;
  }
};
