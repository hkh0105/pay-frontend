import { Reducer } from 'redux';
import { TrackingActions, TrackingActionTypes } from './trackingActions';

export interface TrackingState {
  referrer: string;
}

const initialState: TrackingState = {
  referrer: document.referrer
};

export const trackingReducer: Reducer<TrackingState, TrackingActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TrackingActionTypes.UPDATE_REFERRER: {
      return {
        ...state,
        referrer: action.payload.href
      };
    }
    default: {
      return state;
    }
  }
};
