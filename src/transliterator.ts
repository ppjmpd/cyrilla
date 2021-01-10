import { Replacer } from './replacer/replacer';
import { checkLetter } from './checkLetter';

export class Transliterator {
  private replacer: Replacer;

  constructor(replacer: Replacer) {
    this.replacer = replacer;
  }

  transliterate(text: string): string {
    let upperCaseLetters: number[] = [];
    let isWord = false;
    let start = 0;
    let end = 0;

    let result = '';
    const lastCharacterPosition = text.length - 1;

    /*
        Maybe use streams instead:

        * convert string to words
        * for every word run multi replace text
     */
    for (let i = 0; i <= lastCharacterPosition; i++) {
      const char = text[i];
      const [isLetter, isUpperCase] = checkLetter(char);
      if (isLetter) {
        if (!isWord) {
          isWord = true;
          start = i;
        }
        if (isUpperCase) {
          upperCaseLetters.push(i - start);
        }
        if (i !== lastCharacterPosition) {
          continue;
        }
      }

      if (isWord) {
        end = i + 1;
        const word = text.substring(start, end);
        // Search and replace
        result += this.replacer.replace(word, upperCaseLetters);
        // Reset
        upperCaseLetters = [];
        isWord = false;
      } else {
        result += text[i];
      }
    }
    return result;
  }
}
