import { combineReducers } from 'redux';
import userReducer from "./userReducer";

const appReducer = combineReducers({
  user: userReducer,
  // common: commonReducer,
  // notification: notificationReducer,
});

export default (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = { common: state.common };
  }

  return appReducer(state, action);
};
