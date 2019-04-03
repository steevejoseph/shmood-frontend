import { SCREEN_SELECTED } from '../actions/types';

const INITIAL_STATE = {
  selectedScreen: 'home',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCREEN_SELECTED:
      return { ...state, selectedScreen: action.payload };
    default:
      return state;
  }
};
