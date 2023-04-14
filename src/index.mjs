/**
 * Quick and dirty implementation... probably use a regex instead?
 * https://stackoverflow.com/questions/2103596/regex-that-matches-camel-and-pascal-case
 */
const CamelCaseRegex = /^[a-z]+(?:[A-Z][a-z]+)*$/
const PascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/
const bothRegex = /^[a-zA-Z][a-z]+(?:[A-Z][a-z]+)*$/

/**
 *
 * @param sInput {string}
 * @return {boolean}
 */
export function isCamelOrPascalCase(sInput){
    return bothRegex.test(sInput)
}

function renameDirectoryAndFiles(dirPath){
    /**
     * Check directory (maybe)
     * list files (recursive maybe?)
     * extract filename (base?) check if camelcase
     * if it is. rename to snakecase (re-add file extention)
     */

}

export default {isCamelOrPascalCase}