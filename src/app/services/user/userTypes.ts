import { Card } from 'app/services/cards/cardTypes';

export interface UserProfileResponse {
  payment_methods: {
    cards: Card[];
  };
  has_pin: boolean;
  is_using_onetouch_pay: boolean;
}

export interface UserState {
  isProfileFetching: boolean;
  profile?: {
    paymentMethods: {
      cards: Card[];
    };
    hasPin: boolean;
    isUsingOnetouchPay: boolean;
  };
}
