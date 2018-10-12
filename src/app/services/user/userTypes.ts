import { Card } from 'app/services/cards/cardTypes';

export interface UserProfileResponse {
  payment_methods: {
    cards: Card[];
  };
  has_pin: boolean;
  is_using_onetouch_pay: boolean;
}

export interface UserState {
  isNotRidiPayUser?: boolean;
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

export interface RegisterCardRequestPayload {
  card_number: string;
  card_password: string;
  card_expiration_date: string;
  tax_id: string;
}

export interface RegisterCardResponse {
  card: Card;
}

export interface DeleteCardRequestPayload {
  payment_method_id: string;
}

export interface OnetouchToggleRequestPaylaod {
  enable_onetouch_pay: boolean;
}

export interface RegisterPinPayload {
  pin: string;
}

export interface UpdatePinPayload {
  pin: string;
  validation_token: string;
}

export interface ValidatePinPayload {
  pin: string;
  reservation_id?: string;
}

export interface ValidatePinResponse {
  validation_token: string;
}

export interface ValidatePasswordPayload {
  password: string;
  reservation_id: string;
}

export interface ValidatePasswordResponse {
  validation_token: string;
}
