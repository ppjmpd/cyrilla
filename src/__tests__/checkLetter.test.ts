import { checkLetter } from '../checkLetter';
import { POLISH_MODERN_ALPHABET_TO_CYRILLIC_1865 } from '../lang/pl/cyrillic1865';

const alphabet = Object.keys(POLISH_MODERN_ALPHABET_TO_CYRILLIC_1865);
const alphabetUpperCase = alphabet.map((letter) => letter.toUpperCase());
const digits = [...Array(10).keys()].map((num) => `${num}`);
const special = ['\n', '\r', ' ', '.', ',', ':', ';', '?', '!'];

describe('checkLetter()', () => {
  it.each([...alphabet])('should return true for lower-case letter %s', (char) => {
    expect(checkLetter(char)).toEqual([true, false]);
  });
  it.each([...alphabetUpperCase])('should return true for upper-case letter %s', (char) => {
    expect(checkLetter(char)).toEqual([true, true]);
  });

  it.each([...digits, ...special])('should return false for symbol %s', (char) => {
    expect(checkLetter(char)).toEqual([false, true]);
  });
});
