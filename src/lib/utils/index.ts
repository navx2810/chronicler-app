export * from "./json-display"

/** Gets an array of matches for the [[Entry]] patterns given
 * @param  {RegExp} pattern The pattern for the [[Entry]]
 * @param  {string} message The contents of an [[Entry]]
 * @returns Array An array of matches
 */
export function GetMatchesForPattern(pattern: RegExp, message: string): Array<any> {
    let matches = []
    let match

    while (match = pattern.exec(message)) { matches.push(match[1]) }
    return matches
}