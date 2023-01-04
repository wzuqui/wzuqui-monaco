import typescript from 'typescript';

export function transpileModule(code: string) {
  const output = typescript.transpileModule(code, {
    compilerOptions: {
      module: typescript.ModuleKind.ESNext,
      jsx: typescript.JsxEmit.React,
      target: typescript.ScriptTarget.ESNext,
      esModuleInterop: true,
    },
  });
  const result = output.outputText.replace(
    /(import.*['"])([^.].*)(['"])/gm,
    '$1https://jspm.dev/$2$3'
  );

  return result;
}
