/**
 *
 * @param {TemplateStringsArray} strings
 * @param  {Array<string | number>} args
 * @returns {string}
 */
export function html(strings, ...args) {
  let result = "";

  strings.forEach((str, i) => {
    if (args[i]) result += str + args[i];
    result += str;
  });

  return result;
}
