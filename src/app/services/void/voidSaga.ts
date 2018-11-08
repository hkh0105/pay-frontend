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
  try {
    const response: AxiosResponse<SetOnetouchResponse> = yield call(requestSetOnetouch, {
      enable_onetouch_pay: action.payload.enable_onetouch_pay
    });
    paymentMethodId = response.data.payment_method_id;
    yield put(
      UserActions.toggleOnetouchSuccess({ enable_onetouch_pay: action.payload.enable_onetouch_pay })
    );
  } catch (e) {
    alert(e.data.message);
    return;
  }
  const state: RootState = yield select((s) => s);
  if (state.user.urlToReturn) {
    alert('RIDI Pay 카드 등록이 완료되었습니다.');

    // Note: This won't work in server-side
    const parser = document.createElement('a');
    parser.href = state.user.urlToReturn;
    const queryString = qs.parse(parser.search, { ignoreQueryPrefix: true });
    const newQueryString = {
      ...queryString,
      payment_method_id: paymentMethodId
    };
    parser.search = qs.stringify(newQueryString);
    location.replace(decodeURIComponent(parser.href));
  } else {
    yield call(loadUserProfileRequest);
    alert('RIDI Pay 카드 등록이 완료되었습니다.');
    history.replace(urls.SETTINGS);
  }
}
