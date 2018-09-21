import { UserProfileResponse } from 'app/services/user/userTypes';
import { ActionsUnion, createAction } from 'app/types/redux';

export enum UserActionTypes {
  FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST',
  FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS',
  FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE'
}

export const UserActions = {
  fetchUserProfileRequest: () => createAction(UserActionTypes.FETCH_USER_PROFILE_REQUEST),
  fetchUserProfileSuccess: (payload: UserProfileResponse) =>
    createAction(UserActionTypes.FETCH_USER_PROFILE_SUCCESS, payload),
  fetchUserProfileFailure: () => createAction(UserActionTypes.FETCH_USER_PROFILE_FAILURE)
};

export type UserActions = ActionsUnion<typeof UserActions>;
