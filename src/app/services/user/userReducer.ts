import { UserActions, UserActionTypes } from 'app/services/user/userActions';
import { UserState } from 'app/services/user/userTypes';
import { Reducer } from 'redux';

const initailState: UserState = {
  isProfileFetching: false,
  isUserLoggedIn: false,
  isAddingCardFetching: false,
  isDeletingCardFetching: false,
  cards: [],
  hasPin: false,
  isUsingOnetouchPay: false
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
        cards: action.payload.cards
      };
    }
    case UserActionTypes.ADD_CARD_FAILURE: {
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
  }
  return state;
};
