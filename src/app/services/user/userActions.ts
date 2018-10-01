import {
  AddCardRequestPayload,
  AddCardResponse,
  DeleteCardRequestPayload,
  FetchUserProfileFailurePayload,
  OnetouchToggleRequestPaylaod,
  UserProfileResponse
} from 'app/services/user/userTypes';
import { ActionsUnion, createAction } from 'app/types/redux';

export enum UserActionTypes {
  FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST',
  FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS',
  FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE',
  ADD_CARD_REQUEST = 'ADD_CARD_REQUEST',
  ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS',
  ADD_CARD_FAILURE = 'ADD_CARD_FAILURE',
  DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST',
  DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS',
  DELETE_CARD_FAILURE = 'DELETE_CARD_FAILURE',
  TOGGLE_ONETOUCH_REQUEST = 'TOGGLE_ONETOUCH_REQUEST',
  TOGGLE_ONETOUCH_SUCCESS = 'TOGGLE_ONETOUCH_SUCCESS',
  TOGGLE_ONETOUCH_FAILURE = 'TOGGLE_ONETOUCH_FAILURE'
}

export const UserActions = {
  fetchUserProfileRequest: () => createAction(UserActionTypes.FETCH_USER_PROFILE_REQUEST),
  fetchUserProfileSuccess: (payload: UserProfileResponse) =>
    createAction(UserActionTypes.FETCH_USER_PROFILE_SUCCESS, payload),
  fetchUserProfileFailure: (payload: FetchUserProfileFailurePayload) =>
    createAction(UserActionTypes.FETCH_USER_PROFILE_FAILURE, payload),
  addCardRequest: (payload: AddCardRequestPayload) =>
    createAction(UserActionTypes.ADD_CARD_REQUEST, payload),
  addCardSuccess: (payload: AddCardResponse) =>
    createAction(UserActionTypes.ADD_CARD_SUCCESS, payload),
  addCardFailure: () => createAction(UserActionTypes.ADD_CARD_FAILURE),
  deleteCardRequest: (payload: DeleteCardRequestPayload) =>
    createAction(UserActionTypes.DELETE_CARD_REQUEST, payload),
  deleteCardSuccess: (payload: DeleteCardRequestPayload) =>
    createAction(UserActionTypes.DELETE_CARD_SUCCESS, payload),
  deleteCardFailure: () => createAction(UserActionTypes.DELETE_CARD_FAILURE),
  toggleOnetouchRequest: (payload: OnetouchToggleRequestPaylaod) =>
    createAction(UserActionTypes.TOGGLE_ONETOUCH_REQUEST, payload),
  toggleOnetouchSuccess: (payload: OnetouchToggleRequestPaylaod) =>
    createAction(UserActionTypes.TOGGLE_ONETOUCH_SUCCESS, payload),
  toggleOnetouchFailure: (payload: OnetouchToggleRequestPaylaod) =>
    createAction(UserActionTypes.TOGGLE_ONETOUCH_FAILURE, payload)
};

export type UserActions = ActionsUnion<typeof UserActions>;
