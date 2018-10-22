import { cleanUpCardNumber } from '../prettifyCardNumber';

describe('clearUpCardNumber', () => {
  it('should trim whitespaces', () => {
    expect(cleanUpCardNumber('a bcd e')).toEqual('abcde');
  });
});
