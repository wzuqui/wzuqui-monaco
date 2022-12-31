import { ITreeNode } from '../../interfaces/tree-node';
import { orderBy } from '../../utils/orderBy';

export const helpers = {
  addNodeRecursive(node: ITreeNode, parent: ITreeNode, child: ITreeNode) {
    if (node.items) {
      node.items.forEach(item => {
        if (parent.full_name === item.full_name) {
          let newItems = orderBy(
            [...(item.items ?? []), child],
            item => `${item.isFolder ? '1_' : '2_'}${item.name}`
          );
          item.items = newItems;
        }
        helpers.addNodeRecursive(item, parent, child);
      });
    }
  },
  findNodeRecursive(node: ITreeNode, full_name: string): ITreeNode | undefined {
    if (node.items) {
      for (const item of node.items) {
        if (item.full_name === full_name) {
          return item;
        }
        const found = helpers.findNodeRecursive(item, full_name);
        if (found) {
          return found;
        }
      }
    }
  },
  findSelectedNodeRecursive(node: ITreeNode): ITreeNode | undefined {
    if (node.isSelected) {
      return node;
    }
    if (node.items) {
      for (const item of node.items) {
        const found = helpers.findSelectedNodeRecursive(item);
        if (found) {
          return found;
        }
      }
    }
  },
  setSelectedNodeRecursive(node: ITreeNode, full_name: string) {
    if (node.full_name === full_name) {
      node.isSelected = true;
    }
    if (node.items) {
      node.items.forEach(item => {
        item.isSelected = false;
        if (full_name === item.full_name) {
          item.isSelected = true;

          if (item.isFolder) {
            item.isFolderOpen = !item.isFolderOpen;
          }
        }
        helpers.setSelectedNodeRecursive(item, full_name);
      });
    }
  },
  setTreeNodeContentRecursive(node: ITreeNode, full_name: string, content: string) {
    if (node.items) {
      node.items.forEach(item => {
        if (full_name === item.full_name) {
          item.content = content;
        }
        helpers.setTreeNodeContentRecursive(item, full_name, content);
      });
    }
  },
};
