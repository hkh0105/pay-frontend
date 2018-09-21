import { UserActions, UserActionTypes } from 'app/services/user/userActions';
import { UserState } from 'app/services/user/userTypes';
import { Reducer } from 'redux';

const initailState: UserState = {
  isProfileFetching: false
};

export const userReducer: Reducer<UserState, UserActions> = (state = initailState, action) => {
  return state;
};
