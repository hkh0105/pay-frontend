import detectIt from 'detect-it';
import { all, put, take } from 'redux-saga/effects';

import { REQUEST_INITIALIZE_ENVIRONMENT, setEnvironment } from 'app/services/environment/actions';

const DEVICE_TYPE_PAPER = 'PAPER Build';
const DEVICE_TYPE_PAPER_LITE = 'PAPER Lite Build';
const DEVICE_TYPE_PAPER_PRO = 'PAPER PRO Build';
const paperDeviceTypes = [DEVICE_TYPE_PAPER, DEVICE_TYPE_PAPER_LITE, DEVICE_TYPE_PAPER_PRO];

export function* watchRequestInitializeEnvironment() {
  while (true) {
    yield take(REQUEST_INITIALIZE_ENVIRONMENT);
    yield put(
      setEnvironment({
        platform: {
          isTouchDevice: detectIt.hasTouch,
          isPaper: paperDeviceTypes.some((deviceType) => navigator.userAgent.includes(deviceType)),
          isPaperPro: navigator.userAgent.includes(DEVICE_TYPE_PAPER_PRO)
        }
      })
    );
  }
}

export function* environmentSaga() {
  yield all([watchRequestInitializeEnvironment()]);
}
