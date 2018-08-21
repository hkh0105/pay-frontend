export const DEFAULT_CARD_NUMBER_LENGTH = 16;
export const DEFAULT_CARD_NUMBER_PATTERN = /(\d{4}\d{4}\d{4}\d{4})/g;
export const DEFAULT_CARD_NUMBER_GAP = [4, 8, 12];

export interface CardNumberFormat {
  type: string;
  prefixPattern?: RegExp;
  pattern: RegExp;
  maxLength: number;
  gap: number[];
}

export const defaultCardNumberFormat: CardNumberFormat = {
  type: 'default',
  pattern: DEFAULT_CARD_NUMBER_PATTERN,
  maxLength: DEFAULT_CARD_NUMBER_LENGTH,
  gap: DEFAULT_CARD_NUMBER_GAP
};

/**
 * Based on ko.wikipedia
 * https://goo.gl/KtQ84C
 */
export const cardNumberFormats: Array<CardNumberFormat & { prefixPattern: RegExp }> = [
  {
    type: 'americanExpress',
    prefixPattern: /^3[47]/,
    pattern: /(\d{4})(\d{6})(\d{5})/,
    maxLength: 15,
    gap: [4, 10]
  },
  {
    type: 'dinersclub',
    prefixPattern: /^(3[689]|30[0-5]|3095)/,
    pattern: /(\d{4}\d{4}\d{4}\d{2})/g,
    maxLength: 14,
    gap: DEFAULT_CARD_NUMBER_GAP
  }
];

export function getCardTypeByNumber(cardNumber: string): CardNumberFormat {
  return (
    cardNumberFormats.find((cardType) => cardType.prefixPattern.test(cardNumber)) ||
    defaultCardNumberFormat
  );
}

export function prettifyCardNumber(cardNumber: string, cardType: CardNumberFormat) {
  const offsets = [0, ...cardType.gap, cardType.maxLength];
  return offsets
    .slice(0, -1)
    .map((start: number, index: number) => {
      if (start >= cardNumber.length) {
        return;
      }
      const end = Math.min(offsets[index + 1], cardNumber.length);
      return cardNumber.substring(start, end);
    })
    .join(' ')
    .trimRight();
}

export function cleanUpCardNumber(cardNumber: string) {
  return cardNumber.replace(/ /g, '');
}
