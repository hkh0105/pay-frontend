import { history } from 'app/config';
import { urls } from 'app/routes';
import { RootState } from 'app/store';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { loadUserProfileRequest, toggleOnetouch } from '../user/userSaga';
import { VoidActions, VoidActionsTypes } from './voidActions';

export function* voidSaga() {
  yield takeEvery(VoidActionsTypes.FINISH_PAYMENT_REGISTRATION, watchFinishPaymentRegistration);
}

function* watchFinishPaymentRegistration(
  action: ReturnType<typeof VoidActions.finishPaymentRegistration>
) {
  yield call(toggleOnetouch, { enable_onetouch_pay: action.payload.enable_onetouch_pay });
  const state: RootState = yield select((s) => s);
  if (state.user.urlToReturn) {
    alert('RIDI Pay 카드 등록이 완료되었습니다.');
    location.replace(this.props.user.urlToReturn);
  } else {
    yield call(loadUserProfileRequest);
    alert('RIDI Pay 카드 등록이 완료되었습니다.');
    history.replace(urls.SETTINGS);
  }
}
