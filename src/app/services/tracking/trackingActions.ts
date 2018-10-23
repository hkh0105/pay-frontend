import { ActionsUnion, createAction } from 'app/types/redux';
import { UpdateReferrerPayload } from './trackingTypes';

export enum TrackingActionTypes {
  UPDATE_REFERRER = 'UPDATE_REFERRER'
}

export const TrackingActions = {
  updateReferrer: (payload: UpdateReferrerPayload) =>
    createAction(TrackingActionTypes.UPDATE_REFERRER, payload)
};

export type TrackingActions = ActionsUnion<typeof TrackingActions>;
