import { MISSING_LATIN_LETTERS } from './missingLatinLetters';
import {
  POLISH_MODERN_ALPHABET_TO_CYRILLIC_1865,
  POLISH_MODERN_DIGRAPHS_TO_CYRILLIC_1865,
  POLISH_OLD_DIGRAPHS_TO_CYRILLIC_1865,
} from './cyrillic1865';
import {
  POLISH_MODERN_ALPHABET_TO_CYRILLIC_1975,
  POLISH_MODERN_DIGRAPHS_TO_CYRILLIC_1975,
  POLISH_MODERN_LATIN_TO_CYRILLIC_1975_RULES,
} from './cyrillic1975';
import { Rules } from '../rules';

// noinspection SpellCheckingInspection,
/**
 * Based on `Букварь для сельских детей. СПб., 1865.` a.k.a. `Элемэнтар̌ъ для дзеци вейскихъ`
 * @description https://ru.wikipedia.org/wiki/Польская_кириллица
 * @see https://w.wiki/tad
 */
export const POLISH_TO_CYRILLIC_1865: Rules = {
  ...MISSING_LATIN_LETTERS,
  ...POLISH_MODERN_ALPHABET_TO_CYRILLIC_1865,
  ...POLISH_OLD_DIGRAPHS_TO_CYRILLIC_1865,
  ...POLISH_MODERN_DIGRAPHS_TO_CYRILLIC_1865,
};

/**
 * Based on `Инструкция по русской передаче географических названий Польши., М., 1975.`
 * @description https://ru.wikipedia.org/wiki/Польско-русская_практическая_транскрипция
 * @see https://w.wiki/tai
 */
export const POLISH_TO_CYRILLIC_1975: Rules = {
  ...MISSING_LATIN_LETTERS,
  ...POLISH_MODERN_ALPHABET_TO_CYRILLIC_1975,
  ...POLISH_MODERN_DIGRAPHS_TO_CYRILLIC_1975,
  ...POLISH_MODERN_LATIN_TO_CYRILLIC_1975_RULES,
};
