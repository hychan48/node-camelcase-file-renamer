import {snakeCase} from "snake-case";

/**
 * Quick and dirty implementation... probably use a regex instead?
 * https://stackoverflow.com/questions/2103596/regex-that-matches-camel-and-pascal-case
 */
const CamelCaseRegex = /^[a-z]+(?:[A-Z][a-z]+)*$/
const PascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/
const bothRegex = /^[a-zA-Z][a-z]+(?:[A-Z][a-z]+)*$/
// import {URL} from 'node:url'
import {basename,extname} from 'node:path'
/**
 *
 * @param sInput {string}
 * @return {boolean}
 */
export function isCamelOrPascalCase(sInput){
    return bothRegex.test(sInput)
}

/**
 *
 * @param sInput {string} | Filename or FolderName returns the same
 * @return {string}
 *
 * https://nodejs.org/api/url.html
 */
export function extractFileName(sInput){
    return basename(sInput,extname(sInput))
}

/**
 *
 * @param filepath {string}
 * @return {string} | Returns empty string "" if not Camelcase
 */
export function getRenameFilepath(filepath){
    // basename(sInput,extname(sInput))
    const extName = extname(filepath)
    const baseName = basename(filepath,extName)
    if(!isCamelOrPascalCase(baseName)) return "";
    //extractFileName can be optimized... since it's being called twice...
    return snakeCase(baseName) + extName;

}
function renameDirectoryAndFiles(dirPath){
    /**
     * Check directory (maybe)
     * list files (recursive maybe?)
     * extract filename (base?) check if camelcase
     * If it is. rename to snake case (re-add file extension)
     */

}

export default {isCamelOrPascalCase}