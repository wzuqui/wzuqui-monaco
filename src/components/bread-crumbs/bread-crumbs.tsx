import { ITreeNode } from '../../interfaces/tree-node';
import { ChevronIcon, Container, Icon, Item } from './styles';

interface BreadCrumbsProps {
  treeNode: ITreeNode;
}

export function BreadCrumbs({ treeNode }: BreadCrumbsProps) {
  const breadCrumbs = treeNode.full_name.split('/').filter(p => p !== '.');
  return (
    <Container className="bread-crumbs">
      {breadCrumbs.map((item, index) => (
        <Item key={index}>
          {index > 0 && <ChevronIcon />}
          {item === treeNode.name && (
            <Icon
              src={treeNode.icon}
              alt={treeNode.name}
            />
          )}
          <span key={index}>{item}</span>
        </Item>
      ))}
    </Container>
  );
}
