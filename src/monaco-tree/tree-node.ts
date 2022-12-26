export class TreeNode {
  key: string;
  name: string;
  isDirectory: boolean;
  children: TreeNode[];
  parent: TreeNode | null;

  constructor(
    key: string,
    name: string,
    isDirectory: boolean,
    parent: TreeNode | null
  ) {
    this.key = key;
    this.name = name;
    this.isDirectory = isDirectory;
    this.children = [];
    this.parent = parent;
  }

  get path() {
    if (this.parent == null) return '';
    const parentPath = this.parent.path;
    return parentPath === '' ? this.name : parentPath + '/' + this.name;
  }

  isDescendantOf(treeNode: TreeNode) {
    let parent = this.parent;
    while (parent) {
      if (parent === treeNode) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }
}
