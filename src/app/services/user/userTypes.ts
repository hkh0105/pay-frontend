import { Card } from 'app/services/cards/cardTypes';

export interface UserProfileResponse {
  payment_methods: {
    cards: Card[];
  };
  has_pin: boolean;
  is_using_onetouch_pay: boolean;
}

export interface UserState {
  isUserLoggedIn: boolean;
  isProfileFetching: boolean;
  isAddingCardFetching: boolean;
  isDeletingCardFetching: boolean;
  isOnetouchTogglingFetching: boolean;
  hasPin: boolean;
  isUsingOnetouchPay: boolean;
  cards: Card[];
}

export interface FetchUserProfileFailurePayload {
  isUserLoggedIn: boolean;
}

export interface AddCardRequestPayload {
  card_number: string;
  card_password: string;
  card_expiration_date: string;
  tax_id: string;
}

export interface AddCardResponse {
  card: Card;
}

export interface DeleteCardRequestPayload {
  payment_method_id: string;
}

export interface OnetouchToggleRequestPaylaod {
  enable_onetouch_pay: boolean;
}