import fs from 'fs';
import util from 'util';
const { promisify } = util;

/**
 * @param {path} filepath file needed to read
 * @returns: promise<filedata>
 */
function readFile(path: string) {
  return promisify(fs.readFile)(path, 'utf-8');
}

/**
 * Description: get customerd css/js file data string
 * Notice: you should parse {filename: filepath ... }
 *
 * @param {object} {files} {filename: filepath}
 * @returns:Object {filename => data string}
 */
function getFileData(files: Record<string, string>): Promise<Record<keyof typeof files, string>> {
  const keys = Object.keys(files);
  const promises = keys.map((filename) => readFile(files[filename]));
  return Promise.all(promises).then((data) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = data[i];
    }
    return obj;
  });
}

export { readFile, getFileData };
