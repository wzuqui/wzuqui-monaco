import { BreadCrumbsView } from '../bread-crumbs-view/bread-crumbs-view';
import { TabsView } from '../tabs-view/tabs-view';
import { Container } from './styles';

export function HeaderView() {
  return (
    <Container className="header-view-container">
      <TabsView />
      <BreadCrumbsView />
    </Container>
  );
}
