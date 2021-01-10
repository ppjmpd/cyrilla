import { Rules } from '../lang/rules';
import { END, START } from '../rulesGenerator';
import { Replacer } from './replacer';

const OR = '|';

function convertToRegex(rules: Rules): [RegExp, Rules] {
  const cleanedRules: Rules = {};
  let pattern = '';
  const regexRemoveStartEnd = new RegExp('[' + END + START + ']', 'g');

  Object.keys(rules)
    // Order by length, heaviest first
    .sort((a, b) => b.length - a.length)
    .forEach((rule) => {
      // Remove start and end
      const ruleWithoutAnchors = rule.replace(regexRemoveStartEnd, '');
      cleanedRules[ruleWithoutAnchors] = rules[rule];
      pattern += `${rule}${OR}`;
    });
  const regexp = new RegExp(pattern.slice(0, -1), 'gi');
  return [regexp, cleanedRules];
}

export class ReplacerRegEx extends Replacer {
  private readonly regex: RegExp;

  constructor(rules: Rules) {
    super(rules);
    const [regex] = convertToRegex(rules);
    this.regex = regex;
  }

  replace(word: string, upperCaseLetters: number[] = []): string {
    return word.toLowerCase().replace(this.regex, (substring, position) => {
      // Create rule with higher priority for searching in rules `^` and `$`
      let rule = substring;
      if (position === 0) {
        rule = `${START}${rule}`;
      }
      if (position === word.length - 1) {
        rule += END;
      }
      const replaced = typeof this.rules[rule] === 'undefined' ? this.rules[substring] : this.rules[rule];
      return typeof upperCaseLetters[position] === 'undefined'
        ? replaced
        : replaced[0].toUpperCase() + replaced.slice(1);
    });
  }
}
