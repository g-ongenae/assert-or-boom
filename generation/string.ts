/**
 * Transform the first letter of a string to uppercase
 * @param s string to convert
 * @example 'anyThing' => 'Anything'
 */
function firstLetterUpperCase(s: string): string {
  const s2: string =  s[0].toUpperCase() + s.substring(1);

  return s2.replace(/\s/gi, '');
}

/**
 * 
 */
function toFirstLowerCase(s: string): string {
  const s1: string = toPascalCase(s);

  return s1[0].toLowerCase() + s1.substring(1);
}

/**
 * Transform the first letter of a string to uppercase
 * and the rest to lowercase
 * @param s string to convert
 * @example 'anyThing' => 'Anything'
 */
function toTitleCase(w: string): string {
  return w[0].toUpperCase() + w.substring(1).toLowerCase();
}

/**
 * Transform an snake_case string to a PascalCase
 * @param s string to convert
 * @example 'any_thing' => 'AnyThing'
 */
function toPascalCase(s: string): string {
  return s
    .split(/[\s_]/)
    .map(toTitleCase)
    .join('');
}

export {firstLetterUpperCase, toFirstLowerCase, toPascalCase, toTitleCase};