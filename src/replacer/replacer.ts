import { Rules } from '../lang/rules';

export abstract class Replacer {
  protected constructor(protected readonly rules: Rules) {}
  abstract replace(word: string, upperCaseLetters?: number[]): string;
}
