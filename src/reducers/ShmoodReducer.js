import { SHMOOD_GENERATION_STARTED, SHMOOD_GENERATION_SUCCESS, SHMOOD_GENERATION_FAIL } from '../actions/types';

const INITIAL_STATE = {
  shmoodBeingGenerated: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHMOOD_GENERATION_STARTED:
      return { ...state, shmoodBeingGenerated: true };
    case SHMOOD_GENERATION_SUCCESS:
      return { ...state, shmoodBeingGenerated: true };
    case SHMOOD_GENERATION_FAIL:
      return { ...state, shmoodBeingGenerated: true };
    default:
      return state;
  }
};
