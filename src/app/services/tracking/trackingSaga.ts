import { DeviceType, Tracker } from '@ridi/event-tracker';
import { RootState } from 'app/store';
import { LOCATION_CHANGE } from 'react-router-redux';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { TrackingActions, TrackingActionTypes } from './trackingActions';

export function* trackingSaga() {
  yield takeEvery(LOCATION_CHANGE, watchLocationChange);
}

const TRACKING_ID = 'GTM-5K6C8CJ';

let tracker: Tracker;

export const initializeTracker = (state: RootState) => {
  if (tracker) {
    return;
  }
  let deviceType: DeviceType;
  const { platform } = state.environment;
  if (platform.isPaper || platform.isPaperPro) {
    deviceType = DeviceType.Paper;
  } else if (platform.isTouchDevice) {
    deviceType = DeviceType.Mobile;
  } else {
    deviceType = DeviceType.PC;
  }

  tracker = new Tracker({
    deviceType,
    userId: state.user.userId,
    tagManagerOptions: {
      trackingId: TRACKING_ID
    }
  });
  tracker.initialize();
};

export function* watchLocationChange() {
  yield call(trackCurrentPage);
}

export function* trackCurrentPage() {
  if (tracker) {
    const href = window.location.href;
    const state: RootState = yield select((s) => s);
    if (state.tracking.referrer) {
      tracker.sendPageView(href, state.tracking.referrer);
    } else {
      tracker.sendPageView(href);
    }
    yield put(TrackingActions.updateReferrer({ href }));
  }
}
