import { ChunkExtractor } from '@loadable/server';

/**
 * @param {Object} manifest
 * @param {Array} entrypoints entrypoint
 * @returns: an extractor by loadable components
 */
function getExtractor(stats: Record<string, unknown>, entrypoints: string | string[]) {
  return new ChunkExtractor({
    stats,
    entrypoints,
  });
}

/**
 * get customerd css/js file data string
 *
 * @param {Object} manifest
 * @param {Array} entrypoints entrypoint
 * @returns:Object, contains filename => data string
 */
function getExtractedData(extractor: ChunkExtractor) {
  return {
    link: extractor.getLinkTags(),
    style: extractor.getStyleTags(),
    script: extractor.getScriptTags(),
  };
}

export { getExtractor, getExtractedData };
