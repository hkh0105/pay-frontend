import { flow, keyBy, mapValues } from 'lodash-es';
import * as React from 'react';

import { DEFAULT_CARD_NUMBER_PATTERN } from 'app/utils/prettifyCardNumber';

export interface CardNumberInput {
  value: string;
  maxLength: number;
  regexp: RegExp;
  isValid: boolean;
}

export interface CardCheckboxInput {
  checked: boolean;
  isValid: boolean;
}

export const cardNumberInputKey = {
  cardnumber: 'cardnumber',
  ccmonth: 'ccmonth',
  ccyear: 'ccyear',
  password: 'password',
  birthdate: 'birthdate'
};

export const cardNumberInputName: {
  [key: string]: string;
} = {
  // Use recommended names to use browsers' autofill
  // https://goo.gl/yvVr8z
  cardnumber: 'cardnumber',
  ccmonth: 'ccmonth',
  ccyear: 'ccyear',
  // We need both [name="new-password"] and [role="presentation"]
  // to prefectly prevent wrong autofill on this input T^T
  password: 'new-password',
  birthdate: 'birthdate'
};

export const cardNumberInputAutoCompleteProps: {
  [key: string]: string;
} = {
  cardnumber: 'cc-number',
  ccmonth: 'cc-exp-month',
  ccyear: 'cc-exp-year',
  password: 'off',
  birthdate: 'off'
};

const cardInputLength: {
  [inputId: string]: number;
} = {
  cardnumber: 16,
  ccmonth: 2,
  ccyear: 2,
  password: 2,
  birthdate: 6
};

export type CardNumberInputKey = (typeof cardNumberInputKey)[keyof typeof cardNumberInputKey];

export const cardCheckboxInputKey = {
  agreeToTerms: 'agreeToTerms'
};

export type CardCheckboxInputKey = (typeof cardCheckboxInputKey)[keyof typeof cardCheckboxInputKey];

export const cardInputKey = {
  ...cardNumberInputKey,
  ...cardCheckboxInputKey
};

export type CardInputKey = (typeof cardInputKey)[keyof typeof cardInputKey];

export interface CardFormState {
  numberInputs: {
    [inputId: string]: CardNumberInput;
  };
  checkboxInputs: {
    [inputId: string]: CardCheckboxInput;
  };
}

export interface CardInputRefs {
  [inputId: string]: React.RefObject<any>;
}

export const initialCardFormState: CardFormState = {
  numberInputs: flow(
    (inputKeyMap: typeof cardNumberInputKey) => Object.keys(inputKeyMap),
    (list: string[]) => keyBy(list),
    (dic) =>
      mapValues(dic, (inputState, key) => ({
        value: '',
        maxLength: cardInputLength[key],
        regexp:
          key === cardNumberInputKey.cardnumber
            ? DEFAULT_CARD_NUMBER_PATTERN
            : new RegExp(`[0-9]{${cardInputLength[key]}}`),
        isValid: false
      }))
  )(cardNumberInputKey),
  checkboxInputs: {
    [cardCheckboxInputKey.agreeToTerms]: {
      checked: false,
      isValid: false
    }
  }
};

export const initialCardInputRefs: CardInputRefs = flow(
  (inputKeyEnum: typeof cardInputKey) => Object.keys(inputKeyEnum),
  (list: [string]) => keyBy(list),
  (dic) => mapValues(dic, () => React.createRef())
)(cardInputKey);
