import { UserActions, UserActionTypes } from 'app/services/user/userActions';
import { UserState } from 'app/services/user/userTypes';
import { Reducer } from 'redux';

const initailState: UserState = {
  isProfileFetching: false,
  isUserLoggedIn: false,
  isAddingCardFetching: false,
  isDeletingCardFetching: false,
  isOnetouchTogglingFetching: false,
  cards: [],
  hasPin: false,
  isUsingOnetouchPay: false,
  userId: ''
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
        hasPin: action.payload.has_pin,
        isUsingOnetouchPay: action.payload.is_using_onetouch_pay,
        cards: action.payload.payment_methods.cards
      };
    }
    case UserActionTypes.FETCH_USER_PROFILE_FAILURE: {
      return {
        ...state,
        isProfileFetching: false,
        isNotRidiPayUser: true,
        isUserLoggedIn: action.payload.isUserLoggedIn
      };
    }
    case UserActionTypes.REGISTER_CARD_REQUEST: {
      return {
        ...state,
        isAddingCardFetching: true
      };
    }
    case UserActionTypes.REGISTER_CARD_SUCCESS: {
      return {
        ...state,
        isAddingCardFetching: false
        // cards: [...state.cards, action.payload.card]
      };
    }
    case UserActionTypes.REGISTER_CARD_FAILURE: {
      return {
        ...state,
        isAddingCardFetching: false
      };
    }
    case UserActionTypes.DELETE_CARD_REQUEST: {
      return {
        ...state,
        isDeletingCardFetching: true
      };
    }
    case UserActionTypes.DELETE_CARD_SUCCESS: {
      return {
        ...state,
        isDeletingCardFetching: false,
        cards: state.cards.filter(
          (card) => card.payment_method_id !== action.payload.payment_method_id
        )
      };
    }
    case UserActionTypes.DELETE_CARD_FAILURE: {
      return {
        ...state,
        isDeletingCardFetching: false
      };
    }
    case UserActionTypes.TOGGLE_ONETOUCH_REQUEST: {
      return {
        ...state,
        isOnetouchTogglingFetching: true,
        isUsingOnetouchPay: action.payload.enable_onetouch_pay
      };
    }
    case UserActionTypes.TOGGLE_ONETOUCH_SUCCESS: {
      return {
        ...state,
        isOnetouchTogglingFetching: false,
        isUsingOnetouchPay: action.payload.enable_onetouch_pay
      };
    }
    case UserActionTypes.TOGGLE_ONETOUCH_FAILURE: {
      return {
        ...state,
        isOnetouchTogglingFetching: false,
        isUsingOnetouchPay: !action.payload.enable_onetouch_pay
      };
    }
    case UserActionTypes.UPDATE_URL_TO_RETURN: {
      return {
        ...state,
        urlToReturn: action.payload.url
      };
    }
  }
  return state;
};
