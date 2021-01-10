import { Transliterator } from '../transliterator';
import { ReplacerRegEx } from '../replacer';
import { POLISH_TO_CYRILLIC_1865 } from '../lang';

describe('Transliterator class', () => {
  describe('transliterate()', () => {
    it('should transliterate text from latin to cyrillic', () => {
      const replacer = new ReplacerRegEx(POLISH_TO_CYRILLIC_1865);
      const transliterator = new Transliterator(replacer);
      expect(transliterator.transliterate('Społeczeństwo')).toEqual('Сполэчэньство');
    });
  });
});
