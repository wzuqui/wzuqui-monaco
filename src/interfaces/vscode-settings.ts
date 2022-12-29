export interface IEditorCodeActionsOnSave {
  'source.fixAll': boolean;
  'source.organizeImports': boolean;
}

export interface IVsCodeSettings {
  'editor.codeActionsOnSave': IEditorCodeActionsOnSave;
  'editor.fontFamily': string;
  'editor.fontLigatures': boolean;
  'editor.fontSize': number;
  'editor.formatOnSave': boolean;
  'editor.inlineSuggest.enabled': boolean;
  'editor.insertSpaces': boolean;
  'editor.minimap.enabled': boolean;
  'editor.renderWhitespace': string;
  'editor.tabSize': number;
  'explorer.compactFolders': boolean;
  'files.autoSave': string;
  'workbench.colorTheme': string;
  'workbench.iconTheme': string;
}
