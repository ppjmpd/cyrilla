import { ReplacerRegEx } from '../replacerRegEx';

describe('ReplacerRegEx class', () => {
  let replacer: ReplacerRegEx;
  const rules = {
    '^a': 'а',
    b: 'б',
    c$: 'ц',
  };
  beforeAll(() => {
    replacer = new ReplacerRegEx(rules);
  });

  describe('replace()', () => {
    const word = 'abc';
    const result = Object.values(rules).join('');

    it('should replace characters in string', () => {
      expect(replacer.replace(word)).toEqual(result);
    });

    it('should replace uppercase characters in string', () => {
      expect(replacer.replace(word.toUpperCase(), [0, 1, 2])).toEqual(result.toUpperCase());
    });

    it('should return original string if none matched', () => {
      const word = 'def';
      expect(replacer.replace(word)).toEqual(word);
    });
  });
});
