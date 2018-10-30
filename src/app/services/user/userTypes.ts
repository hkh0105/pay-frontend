export interface Card {
  payment_method_id: string;
  iin: string;
  issuer_name: string;
  color: string;
  logo_image_url: string;
  subscriptions: string[];
}

export interface UserProfileResponse {
  payment_methods: {
    cards: Card[];
  };
  has_pin: boolean;
  is_using_onetouch_pay: boolean;
  user_id: string;
}

export interface UserState {
  isUserLoggedIn: boolean;
  isProfileFetching: boolean;
  isAddingCardFetching: boolean;
  isDeletingCardFetching: boolean;
  isOnetouchTogglingFetching: boolean;
  hasPin: boolean;
  isUsingOnetouchPay: boolean | null;
  cards: Card[];
  userId: string;
  urlToReturn?: string;
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

export interface OnetouchSetRequestPaylaod {
  enable_onetouch_pay: boolean;
  validation_token?: string;
}

export interface OnetouchToggleRequestPaylaod {
  enable_onetouch_pay: boolean;
  validation_token?: string;
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

export interface UpdateUrlToReturnPayload {
  url: string;
}
