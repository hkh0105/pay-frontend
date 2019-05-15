import { UserActions, UserActionTypes } from 'app/services/user/userActions';
import { UserState } from 'app/services/user/userTypes';
import { Reducer } from 'redux';

const initailState: UserState = {
  isProfileFetching: false,
  isUserLoggedIn: false,
  isAddingCardFetching: false,
  isDeletingCardFetching: false,
  isAddingPinFetching: false,
  cards: [],
  hasPin: false,
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
    case UserActionTypes.REGISTER_PIN_REQUEST: {
      return {
        ...state,
        isAddingPinFetching: true
      };
    }
    case UserActionTypes.REGISTER_PIN_SUCCESS: {
      return {
        ...state,
        isAddingPinFetching: false
      };
    }
    case UserActionTypes.REGISTER_PIN_FAILURE: {
      return {
        ...state,
        isAddingCardFetching: false
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
      const filteredCards = state.cards.filter(
        (card) => card.payment_method_id !== action.payload.payment_method_id
      );
      return {
        ...state,
        isDeletingCardFetching: false,
        cards: filteredCards,
        hasPin: filteredCards.length === 0 ? false : state.hasPin,
      };
    }
    case UserActionTypes.DELETE_CARD_FAILURE: {
      return {
        ...state,
        isDeletingCardFetching: false
      };
    }
    case UserActionTypes.UPDATE_URL_TO_RETURN: {
      return {
        ...state,
        urlToReturn: action.payload.url
      };
    }
    case UserActionTypes.UPDATE_REGISTER_TYPE: {
      return {
        ...state,
        registerType: action.payload.type
      };
    }
    case UserActionTypes.UPDATE_CARD_REGISTRATION_TOKEN: {
      return {
        ...state,
        cardRegistrationToken: action.payload.validation_token
      };
    }
  }
  return state;
};
