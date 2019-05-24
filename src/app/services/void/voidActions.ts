import { FinishPaymentRegistrationPayload } from 'app/services/void/voidTypes';
import { createAction } from 'app/types/redux';

// Void actions are the actions that do not make changes
// to the Redux State, but to trigger redux sagas
export enum VoidActionsTypes {
  FINISH_PAYMENT_REGISTRATION = 'FINISH_PAYMENT_REGISTRATION'
}

export const VoidActions = {
  finishPaymentRegistration: (payload: FinishPaymentRegistrationPayload) =>
    createAction(VoidActionsTypes.FINISH_PAYMENT_REGISTRATION, payload)
};
