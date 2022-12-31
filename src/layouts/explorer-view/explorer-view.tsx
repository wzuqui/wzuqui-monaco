import { TreeNode } from '../../components/tree-node/tree-node';
import { selectWorkspace } from '../../features/workspace/workspaceSlice';
import { useRootSelector } from '../../hooks/useRootSelector';
import { Container } from './styles';

export function ExplorerView() {
  const workspace = useRootSelector(selectWorkspace);

  return (
    <Container className="explorer-view">
      {workspace.treeNode.items!.map((p, index) => (
        <TreeNode
          key={index}
          treeNode={p}
        />
      ))}
    </Container>
  );
}
