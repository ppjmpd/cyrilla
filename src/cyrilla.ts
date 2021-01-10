import * as languages from './lang';
import * as replacers from './replacer';
import { Languages } from './lang/languages';
import { Replacers } from './replacer/replacers';
import { Transliterator } from './transliterator';

const defaultLanguage = 'POLISH_TO_CYRILLIC_1865';
const defaultReplacer = 'ReplacerRegEx';

type TransliteratorsReplacers = Record<Replacers, Transliterator>;
type TransliteratorsLanguagesReplacers = Record<Languages, TransliteratorsReplacers>;

/*
 Create nested object with pre init the Transliterator class instances for all languages and replacers
 Use it for save time in `cyrilla()` function
*/
const transliterators = (Object.keys(languages) as Array<Languages>).reduce((transliterators, language) => {
  transliterators[language] = (Object.keys(replacers) as Array<Replacers>).reduce((obj, replacerName) => {
    const rules = languages[language];
    const SomeReplacer = replacers[replacerName];
    const replacer = new SomeReplacer(rules);
    obj[replacerName] = new Transliterator(replacer);
    return obj;
  }, {} as TransliteratorsReplacers);
  return transliterators;
}, {} as TransliteratorsLanguagesReplacers);

interface CyrillaOptions {
  language?: Languages;
  replacer?: Replacers;
}

/**
 * Cyrilla
 */
export function cyrilla(
  text: string,
  { language = defaultLanguage, replacer = defaultReplacer }: CyrillaOptions = {},
): string {
  return transliterators[language][replacer].transliterate(text);
}
