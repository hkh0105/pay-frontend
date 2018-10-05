import { history } from 'app/config';
import { urls } from 'app/routes';
import { UserActions, UserActionTypes } from 'app/services/user/userActions';
import {
  requestDeleteCard,
  requestProfile,
  requestRegisterCard,
  requestToggleOnetouch
} from 'app/services/user/userRequests';
import { RegisterCardResponse, UserProfileResponse } from 'app/services/user/userTypes';
import { RootState } from 'app/store';
import { request } from 'app/utils';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put, select, take, takeEvery } from 'redux-saga/effects';

export function* userSaga() {
  yield takeEvery(UserActionTypes.FETCH_USER_PROFILE_REQUEST, watchLoadUserProfileRequest);
  yield takeEvery(UserActionTypes.REGISTER_CARD_REQUEST, watchAddCardRequest);
  yield takeEvery(UserActionTypes.DELETE_CARD_REQUEST, watchDeleteCardRequest);
  yield call(watchToggleOnetouch);
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

function* watchAddCardRequest(action: ReturnType<typeof UserActions.registerCardRequest>) {
  try {
    const response: AxiosResponse<RegisterCardResponse> = yield call(
      requestRegisterCard,
      action.payload
    );
    const state: RootState = yield select((s) => s);
    // Ask whther user wants to use one touch payment when they don't have cards registered
    const nextUrl = state.user.cards.length ? urls.SETTINGS : urls.ONETOUCH;
    yield put(UserActions.registerCardSuccess(response.data));
    history.replace(nextUrl);
  } catch (e) {
    alert(e.data.message);
    yield put(UserActions.registerCardFailure());
  }
}

function* watchDeleteCardRequest(action: ReturnType<typeof UserActions.deleteCardRequest>) {
  try {
    yield call(requestDeleteCard, action.payload);
    yield put(UserActions.deleteCardSuccess(action.payload));
    history.replace(urls.SETTINGS);
  } catch (e) {
    yield put(UserActions.deleteCardFailure());
  }
}

function* watchToggleOnetouch() {
  while (true) {
    const action: ReturnType<typeof UserActions.toggleOnetouchRequest> = yield take(
      UserActionTypes.TOGGLE_ONETOUCH_REQUEST
    );
    try {
      const result: AxiosResponse = yield call(requestToggleOnetouch, action.payload);
      if (result.status === 200) {
        yield put(UserActions.toggleOnetouchSuccess(action.payload));
      } else {
        yield put(UserActions.toggleOnetouchFailure(action.payload));
      }
    } catch (e) {
      yield put(UserActions.toggleOnetouchFailure(action.payload));
    }
  }
}
