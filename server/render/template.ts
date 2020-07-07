import { readFile } from '../util/readFile';
import minifier, { Options } from 'html-minifier';

const defaultMinifyOptions = {
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  collapseInlineTagWhitespace: true,
  removeTagWhitespace: true,
  collapseWhitespace: true,
  minifyJS: true,
  minifyCSS: true,
};

function minifyHtml(html: string, options?: Options) {
  const minifyOptions = Object.assign(defaultMinifyOptions, options);
  return minifier.minify(html, minifyOptions);
}

interface ParserOptions {
  minify: boolean;
}

export async function parseTemplate(template: string, data: Record<string, string>, options: ParserOptions) {
  let html = await readFile(template);
  html = html.replace(/<%(.*?)%>/g, (matchedPattern, matchedString) => {
    const key = matchedString.trim();
    if (data[key] === void 0) {
      throw new Error(`You need to parse ${key} in your data to replace template!`);
    }
    return data[key];
  });
  if (options.minify) {
    if (typeof options.minify === 'boolean') {
      html = minifyHtml(html);
    } else {
      html = minifyHtml(html, options.minify);
    }
  }
  return html;
}
