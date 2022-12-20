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
  allowJs: true,
  allowSyntheticDefaultImports: true,
  jsx: JsxEmit.React,
  experimentalDecorators: true,
  target: ScriptTarget.ESNext,
};
