/**
yarn add mocha -D

package.json
  "imports": {
    "##/*": {
      "default": "./*"
    },
  },
  "type": "module",

  jsconfig.json
  {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "##/*": ["./*"]
    }
  },
  "exclude": ["node_modules", ".nuxt", "dist"]
}



*/
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const assert = require('assert');
// const {describe,it} = require('mocha');
import assert from 'node:assert';
import { describe, it} from 'mocha';
/*
1.
yarn add mocha @babel/polyfill @babel/register @babel/preset-env babel-plugin-module-resolver --dev
yarn add @babel/core --dev
2.
-r @babel/register -r babel-plugin-module-resolver

3.
.babelrc
{

  "presets": ["@babel/preset-env"],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "test": "./test",
        "underscore": "lodash",

        "~": "./"
      }
    }]
  ]

}
test specific timeout
this.timeout(500);//500ms
*/
/**
 * Should put this somewhere safe
 * todo filepath needs to be initialized as well...
 * @param fileName .json
 * @param data will automatically be changed
 */
import fs from 'node:fs';
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
import camelCase from 'camelcase';
import {snakeCase} from 'snake-case';
import {extractFileName, getRenameFilepath, isCamelOrPascalCase} from "../src/index.mjs";

/**
 * https://yarnpkg.com/package/camelcase
 * https://yarnpkg.com/package/snake-case
 */
describe('index.test.mjs', function(){
  it('detect camelcase initial', function(){
    //assert.strictEqual(1,1);//require assert
    let out
    let expected = 'fooBar'
    out = camelCase('foo-bar');
    assert.strictEqual(out,expected);
    assert.strictEqual(typeof(out),'string');
  });
  it('detect camelcase', function(){
    const input = 'fooBar'
    const expected = true;
    let out;
    out = isCamelOrPascalCase(input);
    assert.strictEqual(out,expected);
  });
  /**
   * So the filename needs to be extracted before it works
   * it won't think it's camelcase...
   */
  it('detect camelcase with filename', function(){
    const input = 'fooBar.md'
    const expected = false;
    let out;
    out = isCamelOrPascalCase(input);
    assert.strictEqual(out,expected);
  });
  it('detect camelcase false', function(){
    const input = 'foo-bar'
    const expected = false;
    let out;
    out = isCamelOrPascalCase(input);
    assert.strictEqual(out,expected);
  });
  //maybe add a batch version - need another package apparently
  it('convert camelcase to snakecase', function(){
    //assert.strictEqual(1,1);//require assertc
    const expected_snake = 'foo_bar'
    const expected_cc = 'fooBar'
    let out;
    out = camelCase(expected_snake)
    assert.strictEqual(out,expected_cc)
    out = snakeCase(out);
    assert.strictEqual(out,expected_snake)
  });
  it('extractFileName',function(){
    let out
    const input = 'someThing.md'
    const expected = 'someThing'
    out = extractFileName(input);
    assert.strictEqual(out,expected);
  });
  it('extractFileName folder',function(){
    let out
    const input = 'someThing'
    const expected = 'someThing'
    out = extractFileName(input);
    assert.strictEqual(out,expected);
  });
  it('getRenameFilepath - cc',function(){
    let out
    const input = 'someThing.md'
    const expected = 'some_thing.md'
    out = getRenameFilepath(input);
    assert.strictEqual(out,expected);
  });
  it('getRenameFilepath - other',function(){
    let out
    const input = 'some-thing.md'
    const expected = ''
    out = getRenameFilepath(input);
    assert.strictEqual(out,expected);
  });
});
