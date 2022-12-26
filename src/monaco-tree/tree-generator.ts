import { TreeNode } from './tree-node';

export function generateDirectoryTree(entries: string[] = [], root = 'root') {
  entries.sort(function (a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  let currentKey = 1;

  const rootNode: TreeNode = new TreeNode(`${currentKey}`, root, true, null);

  entries.forEach((pathStr) => {
    const pathArr = pathStr.split('/');
    const pathLen = pathArr.length;

    let current = rootNode;

    for (let i = 0; i < pathLen; i++) {
      let name = pathArr[i];
      let index = i;

      // If the child node doesn't exist, create it
      let child = current.children.find((el) => el.name === name);

      if (child === undefined && index < pathLen - 1) {
        currentKey = currentKey += 1;
        child = new TreeNode(`${currentKey}`, name, true, current);

        current.children.push(child);
      }

      // make child the current tree node
      current = child;
    }
  });

  //create the files
  entries.forEach((pathStr) => {
    const pathArr = pathStr.split('/');

    const pathLen = pathArr.length;

    let current = rootNode;

    if (pathLen === 1) {
      let name = pathArr[0];

      currentKey = currentKey += 1;

      let node = new TreeNode(`${currentKey}`, name, false, current);

      current.children.push(node);

      return;
    }

    pathArr.forEach((name, index) => {
      let child = current.children.find((el) => el.name === name);

      if (child === undefined && index === pathLen - 1) {
        currentKey = currentKey += 1;

        child = new TreeNode(`${currentKey}`, name, false, current);

        current.children.push(child);
      } else if (child === undefined) {
        return;
      } else {
        current = child;
      }
    });
  });

  return rootNode;
}
