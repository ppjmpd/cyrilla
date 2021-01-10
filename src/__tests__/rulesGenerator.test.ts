import { Rules } from '../lang/rules';
import { RulesGenerator } from '../rulesGenerator';
import { POLISH_CONSONANTS as CONSONANTS, POLISH_VOWELS as VOWELS } from '../lang/pl/phonology';
import {
  POLISH_MODERN_ALPHABET_TO_CYRILLIC_1865 as alphabet,
  POLISH_MODERN_DIGRAPHS_TO_CYRILLIC_1865,
  POLISH_OLD_DIGRAPHS_TO_CYRILLIC_1865,
} from '../lang/pl/cyrillic1865';

describe('RulesGenerator class', () => {
  let rules: RulesGenerator;

  beforeAll(() => {
    rules = new RulesGenerator(
      {
        ...alphabet,
        ...POLISH_MODERN_DIGRAPHS_TO_CYRILLIC_1865,
        ...POLISH_OLD_DIGRAPHS_TO_CYRILLIC_1865,
      },
      VOWELS,
      CONSONANTS,
    );
  });

  describe('create()', () => {
    it('should return basic rule without options', () => {
      expect(rules.create('io', 'ё')).toEqual({ io: 'ё' });
    });

    it('should return rules: on start of word before `b` and `p`', () => {
      // noinspection JSNonASCIINames,NonAsciiCharacters
      expect(
        rules.create('ją', 'йом', {
          onStart: true,
          before: ['b', 'p'],
        }),
      ).toEqual({
        '^jąb': 'йомб',
        '^jąp': 'йомп',
      });
    });

    it('should return rules: `onStart` of word', () => {
      // noinspection JSNonASCIINames,NonAsciiCharacters
      expect(
        rules.create('ją', 'йон', {
          onStart: true,
        }),
      ).toEqual({
        '^ją': 'йон',
      });
    });

    it('should return rules: `onEnd` of word', () => {
      expect(
        rules.create('j', 'й', {
          onEnd: true,
        }),
      ).toEqual({
        j$: 'й',
      });
    });

    it('should return rules: `afterVowel` `before` `b` and `p`', () => {
      const from = 'ją';
      const to = 'ём';
      const before = ['b', 'p'];
      const result: Rules = {};
      VOWELS.forEach((vowel) => {
        before.forEach((beforeLetter) => {
          result[vowel + from + beforeLetter] = alphabet[vowel] + to + alphabet[beforeLetter];
        });
      });

      expect(
        rules.create(from, to, {
          afterVowel: true,
          before,
        }),
      ).toEqual(result);
    });

    it('should return rules: `afterVowel` and `beforeConsonant`', () => {
      const from = 'j';
      const to = 'й';
      const result: Rules = {};
      VOWELS.forEach((vowel) => {
        CONSONANTS.forEach((consonant) => {
          result[vowel + from + consonant] = alphabet[vowel] + to + alphabet[consonant];
        });
      });

      expect(
        rules.create(from, to, {
          afterVowel: true,
          beforeConsonant: true,
        }),
      ).toEqual(result);
    });

    it('should return rules: `afterConsonant`', () => {
      const from = 'ja';
      const to = 'ья';
      const result: Rules = {};
      CONSONANTS.forEach((consonant) => (result[consonant + from] = alphabet[consonant] + to));

      expect(rules.create(from, to, { afterConsonant: true })).toEqual(result);
    });

    it('should return rules: `beforeVowel`', () => {
      const from = 'ja';
      const to = 'ья';
      const result: Rules = {};
      VOWELS.forEach((vowel) => (result[from + vowel] = to + alphabet[vowel]));

      expect(rules.create(from, to, { beforeVowel: true })).toEqual(result);
    });

    it('should return rules: when `after` is rules object', () => {
      // noinspection JSNonASCIINames,NonAsciiCharacters
      expect(
        rules.create('а', 'ая', {
          after: [{ sk: 'ск', ck: 'чк', dz: 'дз' }],
          onEnd: true,
        }),
      ).toEqual({ ckа$: 'чкая', dzа$: 'дзая', skа$: 'ская' });
    });

    it('should return rules: when `after` is rules array', () => {
      // noinspection JSNonASCIINames,NonAsciiCharacters
      expect(rules.create('y', 'и', { after: ['cz', 'rz', 'sz', 'ż'] })).toEqual({
        czy: 'чи',
        rzy: 'p̌и',
        szy: 'ши',
        ży: 'жи',
      });
    });

    it('should return rules: when `before` is rules array with unknown digraphs', () => {
      const result: Rules = {};
      const from = 'ź';
      const to = 'з';
      CONSONANTS.forEach((consonant) => (result[from + consonant + 'i'] = to + alphabet[consonant] + alphabet['i']));

      expect(
        rules.create(from, to, {
          before: CONSONANTS.map((consonant) => `${consonant}i`),
        }),
      ).toEqual(result);
    });
  });
});
