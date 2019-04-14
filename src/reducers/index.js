import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ScreenReducer from './ScreenReducer';
import PhotoReducer from './PhotoReducer';
import ShmoodReducer from './ShmoodReducer';

export default combineReducers({
  form: formReducer,
  photo: PhotoReducer,
  screen: ScreenReducer,
  shmood: ShmoodReducer,
});
