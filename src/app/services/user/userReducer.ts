import { UserActions, UserActionTypes } from 'app/services/user/userActions';
import { UserState } from 'app/services/user/userTypes';
import { Reducer } from 'redux';

const initailState: UserState = {
  isProfileFetching: false,
  isUserLoggedIn: false,
  isAddingCardFetching: false
};

export const userReducer: Reducer<UserState, UserActions> = (
  state = initailState,
  action
): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER_PROFILE_REQUEST: {
      return {
        ...state,
        isProfileFetching: true
      };
    }
    case UserActionTypes.FETCH_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        isProfileFetching: false,
        isUserLoggedIn: true,
        profile: {
          hasPin: action.payload.has_pin,
          isUsingOnetouchPay: action.payload.is_using_onetouch_pay,
          paymentMethods: action.payload.payment_methods
        }
      };
    }
    case UserActionTypes.FETCH_USER_PROFILE_FAILURE: {
      return {
        ...state,
        isProfileFetching: false,
        isUserLoggedIn: action.payload.isUserLoggedIn
      };
    }
    case UserActionTypes.ADD_CARD_REQUEST: {
      return {
        ...state,
        isAddingCardFetching: true
      };
    }
    case UserActionTypes.ADD_CARD_SUCCESS: {
      return {
        ...state,
        isAddingCardFetching: false,
        profile: {
          hasPin: state.profile!.hasPin,
          isUsingOnetouchPay: state.profile!.isUsingOnetouchPay,
          paymentMethods: {
            cards: action.payload.cards
          }
        }
      };
    }
    case UserActionTypes.ADD_CARD_FAILURE: {
      return {
        ...state,
        isAddingCardFetching: false
      };
    }
  }
  return state;
};
