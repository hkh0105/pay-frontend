import { history } from 'app/config';
import { urls } from 'app/routes';
import { UserActions, UserActionTypes } from 'app/services/user/userActions';
import {
  requestDeleteCard,
  requestProfile,
  requestRegisterCard,
  requestRegisterPin,
} from 'app/services/user/userRequests';
import {
  RegisterCardResponse,
  RegisterPinResponse,
} from 'app/services/user/userTypes';
import { RootState } from 'app/store';
import { AxiosError, AxiosResponse } from 'axios';
import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { initializeTracker, trackCurrentPage, tracker } from '../tracking/trackingSaga';
import { VoidActions } from '../void/voidActions';


export function* userSaga() {
  yield takeEvery(UserActionTypes.FETCH_USER_PROFILE_REQUEST, watchLoadUserProfileRequest);
  yield takeEvery(UserActionTypes.REGISTER_CARD_REQUEST, watchAddCardRequest);
  yield takeEvery(UserActionTypes.REGISTER_PIN_REQUEST, watchRegisterPinRequest);
  yield takeEvery(UserActionTypes.DELETE_CARD_REQUEST, watchDeleteCardRequest);
}

function* watchLoadUserProfileRequest() {
  yield call(loadUserProfileRequest);
}

export function* loadUserProfileRequest() {
  try {
    const response = yield call(requestProfile);

    if (response.data && response.data.code === 'NOT_FOUND_USER') {
      yield put(UserActions.fetchUserProfileFailure({ isUserLoggedIn: true }));
    } else {
      yield put(UserActions.fetchUserProfileSuccess(response.data));
    }

    if (!tracker) {
      const state: RootState = yield select((s) => s);
      yield call(initializeTracker, state);
      yield call(trackCurrentPage);
    }
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
    const nextUrl = state.user.cards.length ? urls.SETTINGS : urls.SETTINGS;
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
    alert('카드가 삭제되었습니다.');
  } catch (e) {
    yield put(UserActions.deleteCardFailure());
  }
}

function* watchRegisterPinRequest(action: ReturnType<typeof UserActions.registerPinRequest>) {
  try {
    const response: AxiosResponse<RegisterPinResponse> = yield call(requestRegisterPin, action.payload);
    const payment_method_id = response.data.payment_method_id;
    // 원터치페이 false값으로 고정
    yield put(VoidActions.finishPaymentRegistration({ payment_method_id }));
  } catch (e) {
    alert(e.data.message);
    yield put(UserActions.registerPinFailure());
  }
}

