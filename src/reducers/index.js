import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ScreenReducer from './ScreenReducer';
import PhotoReducer from './PhotoReducer';

export default combineReducers({
  form: formReducer,
  photo: PhotoReducer,
  screen: ScreenReducer,
});
