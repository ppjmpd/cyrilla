import { Rules } from '../lang/rules';

export abstract class Transliterator {
  protected constructor(protected readonly rules: Rules) {}
  abstract replace(word: string, upperCaseLetters?: number[]): string;
}
