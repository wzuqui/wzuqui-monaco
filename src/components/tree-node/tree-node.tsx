import { addFileOpen } from '../../features/filesOpen/filesOpenSlice';
import { setSelectedNode } from '../../features/workspace/workspaceSlice';
import { useRootDispatch } from '../../hooks/useRootDispatch';
import { ITreeNode } from '../../interfaces/tree-node';
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

  return (
    <Container
      {...props}
      className="tree-node"
    >
      <TreeNodeItem
        className="tree-node-item"
        onClick={handleClick}
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
