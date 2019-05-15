import { history } from 'app/config';
import { urls } from 'app/routes';
import { RootState } from 'app/store';
import { AxiosResponse } from 'axios';
import * as qs from 'qs';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { UserActions } from '../user/userActions';
import { loadUserProfileRequest } from '../user/userSaga';
import { VoidActions, VoidActionsTypes } from './voidActions';

export function* voidSaga() {
  yield takeEvery(VoidActionsTypes.FINISH_PAYMENT_REGISTRATION, watchFinishPaymentRegistration);
}

function* watchFinishPaymentRegistration(
  action: ReturnType<typeof VoidActions.finishPaymentRegistration>
) {
  const paymentMethodId: string = action.payload.payment_method_id;
  const state: RootState = yield select((s) => s);
  if (state.user.urlToReturn) {
    alert('카드 등록이 완료되었습니다.');
    yield put(UserActions.registerPinSuccess());
    const { urlToReturn } = state.user;
    const [host, queryString] = decodeURIComponent(urlToReturn).split('?');
    const query: { payment_method_id: string } = qs.parse(queryString);
    query.payment_method_id = paymentMethodId;
    location.replace(`${host}?${qs.stringify(query)}`);
  } else {
    yield call(loadUserProfileRequest);
    alert('카드 등록이 완료되었습니다.');
    history.replace(urls.SETTINGS);
  }
}
