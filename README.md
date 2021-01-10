# Cyrilla

> Transliteration from the Latin script to the Cyrillic script (сyrillization) and vice-versa (romanization)

## Prerequisites

* [Git](https://git-scm.com/);
* [Node.js](https://nodejs.org/) 14+.

## Installation

Add to your project:

```
npm i ppjmpd/cyrilla
```

## Usage

Transliterate from the Polish Latin script to Cyrillic script using default params:

```ts
import { cyrilla } from 'cyrilla';

const cyrillic = cyrilla('Społeczeństwo przyszłości');
console.log(cyrillic);
// Output: 'Сполэчэньство пp̌ышлошци'
```

## API

### `cyrilla()` function

#### `cyrilla(text: string, options: CyrillaOptions)`

```ts
interface CyrillaOptions {
  language?: Languages;
  replacer?: Replacers;
}
```

#### Example

From the Poland Latin script to Cyrillic script 1975:

```ts
import { cyrilla, POLISH_TO_CYRILLIC_1975 } from 'cyrilla';

const cyrillic1865 = cyrilla('Społeczeństwo przyszłości', {
  language: POLISH_TO_CYRILLIC_1975,
});
console.log(cyrillic1865);
// Output: 'Сполеченьство пржишлошци'
```

### `RulesGenerator` class

#### `new RulesGenerator(rules: Rules, vowels: string[], consonants: string[])`

```ts
type Rules = Record<string, string>;
```

#### `RulesGenerator.create(from: string, to: string, options: CreateOptions)`

```ts
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
```

#### Example

```ts
import { RulesGenerator } from 'cyrilla';

const basicRules = {
  a: 'а',
  b: 'б',
  c: 'к',
  t: 'т',
};
const vowels = ['a'];
const consonants = ['c', 't'];
const rules = new RulesGenerator(basicRules, vowels, consonants);
// Create rules for language, needed to be in lower case
const language = {
  ...rules.create('at', 'эт', { after: ['b', 'c'] }),
};
console.log(language);
/* Output:
{
  bat: 'бэт',
  cat: 'кэт',
}
*/
```

### `ReplacerRegEx` class

#### `new ReplacerRegEx(rules: Rules)`

#### `ReplacerRegEx.replace(word: string, upperCaseLetters?: number[])`

#### Example

```ts
import { ReplacerRegEx } from 'cyrilla';

const rules = {
  '^a': 'а',
  b: 'б',
  c$: 'ц',
};
const replacer = new ReplacerRegEx(rules);
const result = replacer.replace('Abc', [0]);
console.log(result);
// Output: 'Абц'
```

### `Transliterator` class

#### `new Tranliterator(replacer: Replacer)`

#### `Tranliterator.transliterate(text: string)`

#### Example

```ts
import {
  POLISH_TO_CYRILLIC_1865,
  ReplacerRegEx,
  Transliterator,
} from 'cyrilla';

const replacer = new ReplacerRegEx(POLISH_TO_CYRILLIC_1865);
const transliterator = new Transliterator(replacer);
const result = transliterator.transliterate(
  'Na świecie od dawna nie było systemów ideologicznych'
);
console.log(result);
// Output: 'На швеце од давна не было сыстэмôв идэологичных'
```

## Development

Clone repository:

```
git clone https://github.com/ppjmpd/cyrilla
```

```
cd cyrilla
```

## License

Apache 2.0

© Sergey N

Based on https://github.com/jsynowiec/node-typescript-boilerplate
