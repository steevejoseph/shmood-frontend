/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { SCREEN_SELECTED } from './types';

export const selectScreen = screen => ({
  type: SCREEN_SELECTED,
  payload: screen,
});
