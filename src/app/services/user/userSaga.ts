import { UserActions, UserActionTypes } from 'app/services/user/userActions';
import { requestAddCard, requestDeleteCard, requestProfile } from 'app/services/user/userRequests';
import { AddCardResponse, UserProfileResponse } from 'app/services/user/userTypes';
import { request } from 'app/utils';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

export function* userSaga() {
  yield takeEvery(UserActionTypes.FETCH_USER_PROFILE_REQUEST, watchLoadUserProfileRequest);
  yield takeEvery(UserActionTypes.ADD_CARD_REQUEST, watchAddCardRequest);
  yield takeEvery(UserActionTypes.DELETE_CARD_REQUEST, watchDeleteCardRequest);
}

function* watchLoadUserProfileRequest() {
  try {
    const response = yield call(requestProfile);
    yield put(UserActions.fetchUserProfileSuccess(response.data));
  } catch (e) {
    const isUserLoggedIn = e && e.data && e.data.code === 'NOT_FOUND_USER';
    yield put(UserActions.fetchUserProfileFailure({ isUserLoggedIn }));
  }
}

function* watchAddCardRequest(action: ReturnType<typeof UserActions.addCardRequest>) {
  try {
    const response: AxiosResponse<AddCardResponse> = yield call(requestAddCard, action.payload);
    yield put(UserActions.addCardSuccess(response.data));
  } catch (e) {
    yield put(UserActions.addCardFailure());
  }
}

function* watchDeleteCardRequest(action: ReturnType<typeof UserActions.deleteCardRequest>) {
  try {
    yield call(requestDeleteCard, action.payload);
    yield put(UserActions.deleteCardSuccess(action.payload));
  } catch (e) {
    yield put(UserActions.deleteCardFailure());
  }
}
