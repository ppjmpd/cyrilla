type Result = [boolean, boolean];
const cache: Record<string, Result> = {};

/**
 * Check if character is letter
 * @param {string} char character
 * @return [isLetter: boolean, isUpperCase: boolean]
 */
export function checkLetter(char: string): [boolean, boolean] {
  // Check cached
  if (typeof cache[char] !== 'undefined') {
    return cache[char];
  }
  const upperCased = char.toUpperCase();
  const isUpperCase = char === upperCased;
  // Letter has case difference
  const isLetter = char.toLowerCase() !== upperCased;
  const result: Result = [isLetter, isUpperCase];
  // Save result to cache
  cache[char] = result;
  return result;
}
