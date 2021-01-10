import { RulesGenerator } from '../../rulesGenerator';
import { POLISH_CONSONANTS, POLISH_VOWELS } from './phonology';
import { Rules } from '../rules';

// noinspection NonAsciiCharacters,JSNonASCIINames
export const POLISH_MODERN_ALPHABET_TO_CYRILLIC_1975: Rules = {
  a: 'а',
  ą: 'он',
  b: 'б',
  c: 'ц',
  ć: 'ць',
  d: 'д',
  e: 'е',
  ę: 'ен',
  f: 'ф',
  g: 'г',
  h: 'х',
  i: 'и',
  j: 'й',
  k: 'к',
  l: 'л',
  ł: 'л',
  m: 'м',
  n: 'н',
  ń: 'нь',
  o: 'о',
  ó: 'у',
  p: 'п',
  r: 'р',
  s: 'с',
  ś: 'ш', // missing
  t: 'т',
  u: 'у',
  w: 'в',
  y: 'ы',
  z: 'з',
  ż: 'ж', // missing
  ź: 'зь',
};

// noinspection JSNonASCIINames,NonAsciiCharacters
export const POLISH_MODERN_DIGRAPHS_TO_CYRILLIC_1975: Rules = {
  ch: 'х',
  cz: 'ч',
  dź: 'дзь',
  rz: 'рж',
  sz: 'ш',
};

const rules = new RulesGenerator(
  {
    ...POLISH_MODERN_ALPHABET_TO_CYRILLIC_1975,
    ...POLISH_MODERN_DIGRAPHS_TO_CYRILLIC_1975,
  },
  POLISH_VOWELS,
  POLISH_CONSONANTS,
);

// noinspection JSNonASCIINames,NonAsciiCharacters
export const POLISH_MODERN_LATIN_TO_CYRILLIC_1975_RULES: Rules = {
  // a
  ...rules.create('а', 'ая', { after: [{ sk: 'ск', ck: 'цк', dz: 'дзк' }], onEnd: true }),
  ...rules.create('ą', 'ом', { before: ['b', 'p'] }),
  // ć
  // dz
  dz: 'дз',
  dzki$: 'дзицкий',
  dzka$: 'дзицкая',
  // dź
  ...rules.create('dź', 'дз', { before: ['ć', 'l', 'ń', 'ś', 'ź'] }),
  '^e': 'э',
  ...rules.create('ę', 'ем', { before: ['b', 'p'] }),
  // i
  ...rules.create('i', 'ий', { after: [{ sk: 'ск', ck: 'цк', dz: 'дзк' }], onEnd: true }),
  ia: 'я',
  // ią
  ...rules.create('ią', 'ём', { before: ['b', 'p'] }),
  cią: 'цион',
  ią: 'ён',
  ie: 'е',
  // ię
  ięb: 'емб',
  ięp: 'енб',
  ię: 'ен',
  // io
  io: 'ё',
  cio: 'цио',
  // ió, iu
  ió: 'ю',
  iu: 'ю',
  ció: 'чу',
  ciu: 'чу',
  ściu: 'стио',
  śció: 'стио',
  // iu
  iusz$: 'иуш',
  // j
  // ja
  '^ja': 'я',
  ...rules.create('ja', 'я', { afterVowel: true }),
  ja: 'ья',
  // ją
  '^ją': 'йон',
  ...rules.create('ją', 'йом', { onStart: true, before: ['b', 'p'] }),
  ...rules.create('ją', 'ём', { afterVowel: true, before: ['b', 'p'] }),
  ...rules.create('ją', 'ён', { afterVowel: true }),
  ...rules.create('ją', 'ьом', { afterConsonant: true, before: ['b', 'p'] }),
  ją: 'ьон',
  // je
  '^je': 'е',
  ...rules.create('je', 'е', { afterVowel: true }),
  je: 'ье',
  // ję
  ...rules.create('ję', 'ем', { onStart: true, before: ['b', 'p'] }),
  ...rules.create('ję', 'ём', { afterVowel: true, before: ['b', 'p'] }),
  '^ję': 'ён',
  ...rules.create('ję', 'ён', { afterVowel: true }),
  ...rules.create('ję', 'ьем', { afterConsonant: true, before: ['b', 'p'] }),
  ję: 'ьен',
  // jo
  '^jo': 'йо',
  ...rules.create('jo', 'ё', { afterVowel: true }),
  jo: 'ьо',
  // jó
  '^jó': 'ю',
  ...rules.create('jó', 'ю', { afterVowel: true }),
  jó: 'ью',
  // ju
  '^ju': 'ю',
  ...rules.create('ju', 'ю', { afterVowel: true }),
  ju: 'ью',
  ...rules.create('l', 'ль', { onEnd: true }),
  ...rules.create('l', 'ль', { beforeConsonant: true }),
  la: 'ля',
  lą: 'лён',
  ...rules.create('lą', 'лём', { before: ['b', 'p'] }),
  lo: 'лё',
  ló: 'лю',
  lu: 'лю',
  ...rules.create('рж', 'ш', { after: ['k', 'p', 't', 'ch'] }),
  ...rules.create('рж', 'ш', { before: ['k', 'p', 't', 'ch'] }),
  '^rz': 'ж',
  szcz: 'щ',
  // ś
  ...rules.create('ś', 'c', { before: ['ć', 'l', 'ń', 'ś', 'ź'] }),
  ść$: 'сть',
  śc$: 'ст',
  // y
  ...rules.create('y', 'и', { after: ['cz', 'rz', 'sz', 'ż'] }),
  y$: 'ий',
  // ź
  ...rules.create('ź', 'з', { before: ['ć', 'l', 'ń', 'ś', 'dź'] }),
  ...rules.create('ź', 'з', { before: POLISH_CONSONANTS.map((consonant) => `${consonant}i`) }),
};
