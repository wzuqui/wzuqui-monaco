import ts, { JsxEmit, ScriptTarget } from 'typescript';

export function convertTypeScript(texto?: string) {
  const retorno = ts.transpile(texto ?? '', compilerOptions);
  return retorno;
}

export function converteParaHTMLScriptElement(texto?: string) {
  const retorno = document.createElement('script');
  retorno.type = 'module';
  retorno.textContent = `(() => {\n${texto}\n})()`;
  texto ?? '';
  return retorno;
}

export const compilerOptions: ts.CompilerOptions = {
  allowNonTsExtensions: true,
  emitDecoratorMetadata: false,
  esModuleInterop: true,
  experimentalDecorators: false,
  jsx: JsxEmit.React,
  noImplicitAny: false,
  noImplicitReturns: false,
  noImplicitThis: false,
  noSemanticValidation: false,
  noSyntaxValidation: false,
  removeComments: false,
  strictFunctionTypes: false,
  strictNullChecks: false,
  strictPropertyInitialization: false,
  target: ScriptTarget.ESNext,
};
