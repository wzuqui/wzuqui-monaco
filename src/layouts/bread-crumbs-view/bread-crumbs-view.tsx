import { BreadCrumbs as BreadCrumbsBase } from '../../components/bread-crumbs/bread-crumbs';
import { selectFileActive } from '../../features/filesOpen/filesOpenSlice';
import { useRootSelector } from '../../hooks/useRootSelector';

import { Container } from './styles';

export function BreadCrumbsView() {
  const fileActive = useRootSelector(selectFileActive);

  return (
    <Container className="bread-crumbs-view-container">
      <BreadCrumbsBase treeNode={fileActive} />
    </Container>
  );
}
