import { Monaco } from '@monaco-editor/react';
import { defaultTsConfigJson } from '../features/workspace/initialState';

export function setCompilerOptions(
  monaco: Monaco,
  optionsString: string = defaultTsConfigJson
) {
  const tsConfigJson = JSON.parse(optionsString);
  const compilerOptions = transformTsConfigJsonToCompilerOptions(tsConfigJson);
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);
}

function transformTsConfigJsonToCompilerOptions(tsConfigJson: any) {
  const result = tsConfigJson.compilerOptions;
  result.moduleResolution = 2;
  return result;
}
