import path from 'path';

const resolve = (relpath: string) => path.resolve(__dirname, '../..', relpath);

const CLIENT_BUILD_PATH = resolve('dist');

export const MANIFEST_PATH = `${CLIENT_BUILD_PATH}/client-manifest.json`;
export const SERVERBUNDLE_PATH = `${CLIENT_BUILD_PATH}/serverbundle.js`;

export const resolveFromPublic = (relpath: string) => path.resolve(__dirname, '../public', relpath);
export const resolveFromDist = (relpath: string) => path.resolve(__dirname, '../dist', relpath);
