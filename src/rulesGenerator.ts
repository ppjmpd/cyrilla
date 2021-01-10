import { Rules } from './lang/rules';

interface MultiplyOptions {
  from: string;
  to: string;
  onStart?: boolean;
  onEnd?: boolean;
  before?: (string | Rules)[];
  after?: (string | Rules)[];
}

interface CreateOptions {
  onStart?: boolean;
  onEnd?: boolean;
  before?: (string | Rules)[];
  beforeVowel?: boolean;
  beforeConsonant?: boolean;
  after?: (string | Rules)[];
  afterVowel?: boolean;
  afterConsonant?: boolean;
}

// Anchors
export const START = '^';
export const END = '$';

export class RulesGenerator {
  private readonly rules: Rules;
  private readonly vowels: string[];
  private readonly consonants: string[];

  constructor(rules: Rules, vowels: string[], consonants: string[]) {
    this.rules = rules;
    this.vowels = vowels;
    this.consonants = consonants;
  }

  private normalize(arr: (string | Rules)[]): [string[], string[]] {
    const fromArr: string[] = [];
    const toArr: string[] = [];
    arr.forEach((value) => {
      if (typeof value === 'string') {
        fromArr.push(value);
        const to = this.rules[value];
        if (typeof to !== 'undefined') {
          toArr.push(to);
        } else {
          // Transliterate letter by letter
          const str = [...value].reduce((str, fromLetter) => {
            // Maybe we can use multiple string replacement algorithm here
            const toLetter = this.rules[fromLetter];
            return typeof toLetter !== 'undefined' ? str + toLetter : str;
          }, '');
          toArr.push(str);
        }
      } else {
        Object.keys(value).forEach((deepValue) => {
          const deepTo = value[deepValue];
          fromArr.push(deepValue);
          toArr.push(deepTo);
        });
      }
    });
    return [fromArr, toArr];
  }

  private multiply({ from, to, onStart = false, onEnd = false, before = [], after = [] }: MultiplyOptions): Rules {
    const start = onStart ? START : '';
    const end = onEnd ? END : '';
    const rules: Rules = {};
    const [afterFrom, afterTo] = this.normalize(after);
    const [beforeFrom, beforeTo] = this.normalize(before);

    function wrapFrom(str: string) {
      return start + str + end;
    }
    function wrapTo(str: string) {
      return str;
    }

    if (afterFrom.length === 0 && beforeFrom.length === 0) {
      return <Rules>{
        [wrapFrom(from)]: wrapTo(to),
      };
    }
    // B > 0
    if (afterFrom.length === 0) {
      beforeFrom.forEach((beforeFromValue, b) => {
        const beforeToValue = beforeTo[b];
        const fromVal = wrapFrom(from + beforeFromValue);
        rules[fromVal] = wrapTo(to + beforeToValue);
      });
      return rules;
    }
    // A > 0
    if (beforeFrom.length === 0) {
      afterFrom.forEach((afterFromValue, a) => {
        const afterToValue = afterTo[a];
        const fromVal = wrapFrom(afterFromValue + from);
        rules[fromVal] = wrapTo(afterToValue + to);
      });
      return rules;
    }
    // A > 0 && B > 0
    afterFrom.forEach((afterFromValue, a) => {
      const afterToValue = afterTo[a];
      beforeFrom.forEach((beforeFromValue, b) => {
        const beforeToValue = beforeTo[b];
        const fromVal = wrapFrom(afterFromValue + from + beforeFromValue);
        rules[fromVal] = wrapTo(afterToValue + to + beforeToValue);
      });
    });
    return rules;
  }

  create(
    from: string,
    to: string,
    {
      onStart = false,
      onEnd = false,
      before = [],
      beforeVowel = false,
      beforeConsonant = false,
      after = [],
      afterVowel = false,
      afterConsonant = false,
    }: CreateOptions = {},
  ): Rules {
    if (beforeVowel) {
      before.push(...this.vowels);
    }
    if (afterVowel) {
      after.push(...this.vowels);
    }
    if (beforeConsonant) {
      before.push(...this.consonants);
    }
    if (afterConsonant) {
      after.push(...this.consonants);
    }

    return this.multiply({
      from,
      to,
      onStart,
      onEnd,
      after,
      before,
    });
  }
}
