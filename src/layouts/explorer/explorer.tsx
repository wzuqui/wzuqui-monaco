import { TreeNode } from '../../components/tree-node/tree-node';
import { selectWorkspace } from '../../features/workspace/workspaceSlice';
import { useRootSelector } from '../../hooks/useRootSelector';
import { Container } from './styles';

export interface IExplorerProps {}

export function Explorer(props: IExplorerProps) {
  const workspace = useRootSelector(selectWorkspace);
  return (
    <Container className="explorer">
      {workspace.treeNode.items!.map((p, index) => (
        <TreeNode
          key={index}
          treeNode={p}
        />
      ))}
    </Container>
  );
}
