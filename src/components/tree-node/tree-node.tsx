import { addFileOpen } from '../../features/filesOpen/filesOpenSlice';
import { addNode, setSelectedNode } from '../../features/workspace/workspaceSlice';
import { useRootDispatch } from '../../hooks/useRootDispatch';
import { ITreeNode } from '../../interfaces/tree-node';
import { getIcon } from '../../utils/getIcon';
import { IContextMenuItem } from '../context-menu/context-menu';
import { ChevronIcon, Container, TreeNodeItem, TreeNodeItemContent } from './styles';

interface ITreeNodeProps {
  deep?: number;
  treeNode: ITreeNode;
}

export function TreeNode({ deep = 0, treeNode, ...props }: ITreeNodeProps) {
  const dispatch = useRootDispatch();

  function handleClick() {
    if (treeNode.isFile) {
      dispatch(addFileOpen(treeNode));
    }
    dispatch(setSelectedNode(treeNode));
  }

  function onContextMenuItem(item: IContextMenuItem) {
    if (item.action === 'new-file') {
      const response = prompt('Enter file name');
      if (!response) return;
      const name = response;
      const icon = getIcon(false, name, false);
      const newFile: ITreeNode = {
        content: '',
        full_name: treeNode.full_name + '/' + name,
        icon: icon,
        isFile: true,
        isFileActive: false,
        isFileOpen: false,
        isFolder: false,
        isFolderOpen: false,
        isSelected: false,
        name: name,
      };
      dispatch(addNode({ parent: treeNode, node: newFile }));
    }
    if (item.action === 'new-folder') {
      const response = prompt('Enter folder name');
      if (!response) return;
      const name = response;
      const icon = getIcon(true, name, false);
      const newFolder: ITreeNode = {
        content: '',
        full_name: treeNode.full_name + '/' + name,
        icon: icon,
        isFile: false,
        isFileActive: false,
        isFileOpen: false,
        isFolder: true,
        isFolderOpen: false,
        isSelected: false,
        name: name,
        items: [],
      };
      dispatch(addNode({ parent: treeNode, node: newFolder }));
    }
  }

  return (
    <Container
      {...props}
      className="tree-node"
    >
      <TreeNodeItem
        className="tree-node-item"
        onClick={handleClick}
        onContextMenuItem={onContextMenuItem}
        selected={treeNode.isSelected}
        style={{ paddingLeft: deep + 'rem' }}
      >
        <ChevronIcon
          isFile={!treeNode.isFolder}
          isOpen={treeNode.isFolderOpen}
        />
        <img src={treeNode.icon} />
        <span className="name">{treeNode.name}</span>
      </TreeNodeItem>
      <TreeNodeItemContent
        isOpen={treeNode.isFolderOpen}
        isClosed={!treeNode.isFolderOpen}
      >
        {treeNode.items?.map((p, index) => (
          <TreeNode
            key={index}
            treeNode={p}
            deep={deep + 1}
          />
        ))}
      </TreeNodeItemContent>
    </Container>
  );
}
