import { Compiler, MultiCompiler } from 'webpack';
import { Render } from '../render';
import { RequestHandler } from 'express';
import { resolveFromPublic } from '../paths';
import Mfs from 'memory-fs';

interface SsrProps {
  multiCompiler: MultiCompiler;
  render: Render;
}

interface SsrMiddleware {
  (param: SsrProps): RequestHandler;
}

const ssr: SsrMiddleware = ({ multiCompiler, render }) => (req, res, next) => {
  const [clientCompiler, serverCompiler] = multiCompiler.compilers;

  function readMfsFile(compiler: Compiler, filename: string) {
    if (!compiler.options.output) {
      throw new TypeError('compiler output error');
    }

    const { path } = compiler.options.output!;
    return (compiler.outputFileSystem as Mfs).readFileSync(`${path}/${filename}`, 'utf-8');
  }

  const serverbundle = readMfsFile(serverCompiler, 'serverbundle.js');
  const clientManifest = JSON.parse(readMfsFile(clientCompiler, 'client-manifest.json'));

  render({ clientManifest, serverbundle, template: resolveFromPublic('html/index.html') })(req, res, next);
};

export default ssr;
