// import { ITreeNode } from '../components/tree-node/tree-node';
// import { getIcon } from './getIcon';

// export function generateFolder() {
//   const result: RootNode = new RootNode({
//     name: '.',
//     items: [
//       {
//         name: '.vscode',
//         isFolder: true,
//         items: [
//           {
//             content: defaultVscodeSettingsJson,
//             name: 'settings.json',
//             isFile: true,
//           },
//         ],
//       },
//       {
//         name: 'src',
//         isFolder: true,
//         items: [
//           {
//             content: defaultSrcAppTsx,
//             name: 'App.tsx',
//             isFile: true,
//           },
//           {
//             content: defaultSrcMainTsx,
//             name: 'main.tsx',
//             isFile: true,
//           },
//           {
//             content: defaultSrcStylesScss,
//             name: 'styles.scss',
//             isFile: true,
//           },
//         ],
//       },
//       {
//         content: defaultIndexHtml,
//         name: 'index.html',
//         isFile: true,
//       },
//       {
//         content: defaultPackageJson,
//         name: 'package.json',
//         isFile: true,
//       },
//       {
//         content: defaultTsConfigJson,
//         name: 'tsconfig.json',
//         isFile: true,
//       },
//     ],
//   });
//   return result;
// }

// export class RootNode {
//   treeNode: ITreeNode;
//   constructor(args: ITreeNode) {
//     this.treeNode = args;
//     this.treeNode.full_name = '.';
//     this.sanitizeNode(this.treeNode);
//   }

//   sanitizeNode(parent: ITreeNode) {
//     for (const item of parent.items ?? []) {
//       item.parent = parent;
//       item.full_name = parent.full_name ? parent.full_name + '/' + item.name : item.name;
//       item.isFolder = !!item.items;
//       item.isFile = !!item.content;
//       item.icon = getIcon(item.isFolder, item.name, item.isOpen ?? false);
//       if (item.items) {
//         this.sanitizeNode(item);
//       }
//     }
//   }

//   openFile(full_name: string) {
//     const node = this.findNode(full_name);
//     if (node) {
//       node.isOpen = true;
//       return node;
//     }
//   }

//   findNode(full_name: string) {
//     const parts = full_name.split('/');

//     try {
//       const result = parts.reduce((acc, item) => {
//         if (item === '.') {
//           return acc;
//         } else {
//           const next = acc.items?.find(i => i.name === item);
//           if (next) {
//             return next;
//           } else {
//             throw new Error('File not found');
//           }
//         }
//       }, this.treeNode as ITreeNode);
//       return result;
//     } catch (e) {
//       console.error(e);
//     }
//   }
// }

// const defaultIndexHtml = `
// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
//   <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
//   <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
// </head>

// <body>
//   <div id="root"></div>
// </body>

// </html>`.trim();

// const defaultPackageJson = `
// {
//   "name": "react-app",
//   "version": "1.0.0",
//   "description": "",
//   "scripts": {
//     "start": "wip",
//     "build": "wip"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "devDependencies": {
//     "@types/react": "^18.2.0",
//     "@types/react-dom": "^18.2.0",
//     "sass": "^1.39.0",
//     "typescript": "^4.9.3"
//   },
//   "dependencies": {
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0"
//   }
// }`.trim();

// const defaultTsConfigJson = `
// {
//   "compilerOptions": {
//     "allowNonTsExtensions": true,
//     "emitDecoratorMetadata": false,
//     "esModuleInterop": true,
//     "experimentalDecorators": false,
//     "jsx": "react",
//     "noImplicitAny": false,
//     "noImplicitReturns": false,
//     "noImplicitThis": false,
//     "noSemanticValidation": true,
//     "noSyntaxValidation": true,
//     "removeComments": false,
//     "strictFunctionTypes": false,
//     "strictNullChecks": false,
//     "strictPropertyInitialization": false,
//     "target": "ES2020",
//     "typeRoots": [
//       "node_modules/@types"
//     ]
//   },
//   "include": [
//     "src"
//   ]
// }`.trim();

// const defaultSrcMainTsx = `
// import ReactDOM from 'react-dom/client';

// import { App } from './App';

// import './styles.scss';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
// `.trim();

// const defaultSrcStylesScss = `
// html,
// body,
// #root {
//   margin: 0;
//   padding: 0;
// }
// `.trim();

// const defaultSrcAppTsx = `
// function Button(props: React.PropsWithChildren<{}> & React.ButtonHTMLAttributes<HTMLButtonElement>) {
//   return (
//     <button {...props}>
//     </button>
//   );
// }

// export function App() {
//   const [ counter, setCounter ] = React.useState(1);

//   function handleClick() {
//     setCounter(counter + 1);
//   }

//   return (
//     <Button onClick={() => handleClick()}>{counter} + 1</Button>
//   );
// }
// `.trim();

// const defaultVscodeSettingsJson = `
// {
//   "editor.codeActionsOnSave": {
//     "source.fixAll": true,
//     "source.organizeImports": true
//   },
//   "editor.fontFamily": "Fira Code",
//   "editor.fontLigatures": true,
//   "editor.fontSize": 14,
//   "editor.formatOnSave": true,
//   "editor.inlineSuggest.enabled": true,
//   "editor.insertSpaces": true,
//   "editor.minimap.enabled": false,
//   "editor.renderWhitespace": "all",
//   "editor.tabSize": 2,
//   "explorer.compactFolders": false,
//   "files.autoSave": "off",
//   "workbench.colorTheme": "Dracula",
//   "workbench.iconTheme": "material-icon-theme",
// }`.trim();
