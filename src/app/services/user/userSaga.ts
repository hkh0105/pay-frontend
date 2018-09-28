import { UserActions, UserActionTypes } from 'app/services/user/userActions';
import { requestProfile } from 'app/services/user/userRequests';
import { UserProfileResponse } from 'app/services/user/userTypes';
import { request } from 'app/utils';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

export function* userSaga() {
  yield takeEvery(UserActionTypes.FETCH_USER_PROFILE_REQUEST, watchLoadUserProfileRequest);
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
