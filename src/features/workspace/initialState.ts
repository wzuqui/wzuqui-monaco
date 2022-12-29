import { ITreeNode } from '../../interfaces/tree-node';

const defaultIndexHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>

<body>
  <div id="root"></div>
</body>

</html>`.trim();

const defaultPackageJson = `
{
  "name": "react-app",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "wip",
    "build": "wip"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "sass": "^1.39.0",
    "typescript": "^4.9.3"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`.trim();

const defaultTsConfigJson = `
{
  "compilerOptions": {
    "allowNonTsExtensions": true,
    "emitDecoratorMetadata": false,
    "esModuleInterop": true,
    "experimentalDecorators": false,
    "jsx": "react",
    "noImplicitAny": false,
    "noImplicitReturns": false,
    "noImplicitThis": false,
    "noSemanticValidation": true,
    "noSyntaxValidation": true,
    "removeComments": false,
    "strictFunctionTypes": false,
    "strictNullChecks": false,
    "strictPropertyInitialization": false,
    "target": "ES2020",
    "typeRoots": [
      "node_modules/@types"
    ]
  },
  "include": [
    "src"
  ]
}`.trim();

const defaultSrcMainTsx = `
import ReactDOM from 'react-dom/client';

import { App } from './App';

import './styles.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
`.trim();

const defaultSrcStylesScss = `
html,
body,
#root {
  margin: 0;
  padding: 0;
}
`.trim();

const defaultSrcAppTsx = `
function Button(props: React.PropsWithChildren<{}> & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
    </button>
  );
}

export function App() {
  const [ counter, setCounter ] = React.useState(1);

  function handleClick() {
    setCounter(counter + 1);
  }

  return (
    <Button onClick={() => handleClick()}>{counter} + 1</Button>
  );
}
`.trim();

const defaultVscodeSettingsJson = `
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  },
  "editor.fontFamily": "Fira Code",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.formatOnSave": true,
  "editor.inlineSuggest.enabled": true,
  "editor.insertSpaces": true,
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "all",
  "editor.tabSize": 2,
  "explorer.compactFolders": false,
  "files.autoSave": "off",
  "workbench.colorTheme": "Dracula",
  "workbench.iconTheme": "material-icon-theme"
}`.trim();

export interface InitialState {
  treeNode: ITreeNode;
}

export const initialState: InitialState = {
  treeNode: {
    content: '',
    full_name: '.',
    icon: '/',
    isFile: false,
    isFileActive: false,
    isFileOpen: false,
    isFolderOpen: false,
    isSelected: false,
    isFolder: true,
    items: [
      {
        content: '',
        full_name: './.vscode',
        icon: '/assets/icons/folder-vscode.svg',
        isFile: false,
        isFileActive: false,
        isFileOpen: false,
        isFolderOpen: false,
        isSelected: false,
        isFolder: true,
        items: [
          {
            content: defaultVscodeSettingsJson,
            full_name: './.vscode/settings.json',
            icon: '/assets/icons/json.svg',
            isFile: true,
            isFileActive: false,
            isFileOpen: false,
            isFolderOpen: false,
            isSelected: false,
            isFolder: false,
            name: 'settings.json',
          },
        ],
        name: '.vscode',
      },
      {
        content: '',
        full_name: './src',
        icon: '/assets/icons/folder-src.svg',
        isFile: false,
        isFileActive: false,
        isFileOpen: false,
        isFolderOpen: false,
        isSelected: false,
        isFolder: true,
        items: [
          {
            content: defaultSrcAppTsx,
            full_name: './src/App.tsx',
            icon: '/assets/icons/react_ts.svg',
            isFile: true,
            isFileActive: false,
            isFileOpen: false,
            isFolderOpen: false,
            isSelected: false,
            isFolder: false,
            name: 'App.tsx',
          },
          {
            content: defaultSrcMainTsx,
            full_name: './src/main.tsx',
            icon: '/assets/icons/react_ts.svg',
            isFileActive: false,
            isFileOpen: false,
            isFolderOpen: false,
            isSelected: false,
            isFile: true,
            isFolder: false,
            name: 'main.tsx',
          },
          {
            content: defaultSrcStylesScss,
            full_name: './src/styles.scss',
            icon: '/assets/icons/sass.svg',
            isFile: true,
            isFileActive: false,
            isFileOpen: false,
            isFolderOpen: false,
            isSelected: false,
            isFolder: false,
            name: 'styles.scss',
          },
        ],
        name: 'src',
      },
      {
        content: defaultIndexHtml,
        full_name: './index.html',
        icon: '/assets/icons/html.svg',
        isFile: true,
        isFileActive: false,
        isFileOpen: false,
        isFolderOpen: false,
        isSelected: false,
        isFolder: false,
        name: 'index.html',
      },
      {
        content: defaultPackageJson,
        full_name: './package.json',
        icon: '/assets/icons/nodejs.svg',
        isFile: true,
        isFileActive: false,
        isFileOpen: false,
        isFolderOpen: false,
        isSelected: false,
        isFolder: false,
        name: 'package.json',
      },
      {
        content: defaultTsConfigJson,
        full_name: './tsconfig.json',
        icon: '/assets/icons/tsconfig.svg',
        isFile: true,
        isFileActive: false,
        isFileOpen: false,
        isFolderOpen: false,
        isSelected: false,
        isFolder: false,
        name: 'tsconfig.json',
      },
    ],
    name: '.',
  },
};
