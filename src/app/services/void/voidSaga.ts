import { history } from 'app/config';
import { urls } from 'app/routes';
import { RootState } from 'app/store';
import { AxiosResponse } from 'axios';
import * as qs from 'qs';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { UserActions } from '../user/userActions';
import { requestSetOnetouch } from '../user/userRequests';
import { loadUserProfileRequest, toggleOnetouch } from '../user/userSaga';
import { SetOnetouchResponse } from '../user/userTypes';
import { VoidActions, VoidActionsTypes } from './voidActions';

export function* voidSaga() {
  yield takeEvery(VoidActionsTypes.FINISH_PAYMENT_REGISTRATION, watchFinishPaymentRegistration);
}

function* watchFinishPaymentRegistration(
  action: ReturnType<typeof VoidActions.finishPaymentRegistration>
) {
  let paymentMethodId: string;
  let state: RootState = yield select((s) => s);
  try {
    const response: AxiosResponse<SetOnetouchResponse> = yield call(requestSetOnetouch, {
      enable_onetouch_pay: action.payload.enable_onetouch_pay,
      validation_token: state.user.cardRegistrationToken
    });
    paymentMethodId = response.data.payment_method_id;
    yield put(
      UserActions.toggleOnetouchSuccess({ enable_onetouch_pay: action.payload.enable_onetouch_pay })
    );
    yield put(UserActions.updateCardRegistrationToken({ validation_token: '' }));
  } catch (e) {
    alert(e.data.message);
    return;
  }
  state = yield select((s) => s);
  if (state.user.urlToReturn) {
    alert('RIDI Pay 카드 등록이 완료되었습니다.');
    const urlToReturn = state.user.urlToReturn.replace(/&returnUrl=|%26returnUrl%3D/, '');
    const [host, queryString] = decodeURIComponent(urlToReturn).split('?');
    const query: { payment_method_id: string } = qs.parse(queryString);
    query.payment_method_id = paymentMethodId;
    location.replace(`${host}?${qs.stringify(query)}`);
  } else {
    yield call(loadUserProfileRequest);
    alert('RIDI Pay 카드 등록이 완료되었습니다.');
    history.replace(urls.SETTINGS);
  }
}
