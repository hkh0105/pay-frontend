import {
  DeleteCardRequestPayload,
  FetchUserProfileFailurePayload,
  OnetouchToggleRequestPaylaod,
  RegisterCardPayload,
  RegisterCardRequestPayload,
  RegisterCardResponse,
  RegisterPinRequestPayload,
  UpdateRegisterTypePayload,
  UpdateUrlToReturnPayload,
  UserProfileResponse,
} from 'app/services/user/userTypes';
import { ActionsUnion, createAction } from 'app/types/redux';

export enum UserActionTypes {
  FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST',
  FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS',
  FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE',
  REGISTER_CARD_REQUEST = 'REGISTER_CARD_REQUEST',
  REGISTER_CARD_SUCCESS = 'REGISTER_CARD_SUCCESS',
  REGISTER_CARD_FAILURE = 'REGISTER_CARD_FAILURE',
  DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST',
  DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS',
  DELETE_CARD_FAILURE = 'DELETE_CARD_FAILURE',
  TOGGLE_ONETOUCH_REQUEST = 'TOGGLE_ONETOUCH_REQUEST',
  TOGGLE_ONETOUCH_SUCCESS = 'TOGGLE_ONETOUCH_SUCCESS',
  TOGGLE_ONETOUCH_FAILURE = 'TOGGLE_ONETOUCH_FAILURE',
  UPDATE_URL_TO_RETURN = 'UPDATE_URL_TO_RETURN',
  UPDATE_REGISTER_TYPE = 'UPDATE_REGISTER_TYPE',
  UPDATE_CARD_REGISTRATION_TOKEN = 'UPDATE_CARD_REGISTRATION_TOKEN',
  REGISTER_PIN_REQUEST = 'REGISTER_PIN_REQUEST',
  REGISTER_PIN_SUCCESS = 'REGISTER_PIN_SUCCESS',
  REGISTER_PIN_FAILURE = 'REGISTER_PIN_FAILURE'
}

export const UserActions = {
  fetchUserProfileRequest: () => createAction(UserActionTypes.FETCH_USER_PROFILE_REQUEST),
  fetchUserProfileSuccess: (payload: UserProfileResponse) =>
    createAction(UserActionTypes.FETCH_USER_PROFILE_SUCCESS, payload),
  fetchUserProfileFailure: (payload: FetchUserProfileFailurePayload) =>
    createAction(UserActionTypes.FETCH_USER_PROFILE_FAILURE, payload),
  registerCardRequest: (payload: RegisterCardRequestPayload) =>
    createAction(UserActionTypes.REGISTER_CARD_REQUEST, payload),
  registerCardSuccess: (payload: RegisterCardResponse) =>
    createAction(UserActionTypes.REGISTER_CARD_SUCCESS, payload),
  registerCardFailure: () => createAction(UserActionTypes.REGISTER_CARD_FAILURE),
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
    createAction(UserActionTypes.TOGGLE_ONETOUCH_FAILURE, payload),
  updateUrlToReturn: (payload: UpdateUrlToReturnPayload) =>
    createAction(UserActionTypes.UPDATE_URL_TO_RETURN, payload),
  updateRegisterType: (payload: UpdateRegisterTypePayload) =>
    createAction(UserActionTypes.UPDATE_REGISTER_TYPE, payload),
  updateCardRegistrationToken: (payload: RegisterCardPayload) =>
    createAction(UserActionTypes.UPDATE_CARD_REGISTRATION_TOKEN, payload),
  registerPinRequest: (payload: RegisterPinRequestPayload) =>
    createAction(UserActionTypes.REGISTER_PIN_REQUEST, payload),
  registerPinSuccess: () => createAction(UserActionTypes.REGISTER_PIN_SUCCESS),
  registerPinFailure: () => createAction(UserActionTypes.REGISTER_PIN_FAILURE),
};

export type UserActions = ActionsUnion<typeof UserActions>;
