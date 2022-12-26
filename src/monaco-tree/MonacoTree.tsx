import { TreeNode } from './tree-node';

interface MonacoTreeProps {
  directory: TreeNode;
  treeConfig: ITreeConfig;
  getActions: unknown;
  onClickFile: unknown;
}

export function MonacoTree() {
  return <div>monaco tree aqui</div>;
}

interface ITreeConfig {
  dataSource: {
    getId(tree: TreeNode, element: IElement): IElementKey;
    hasChildren(tree: TreeNode, element: IElement): boolean;
    getChildren(tree: TreeNode, element: IElement): Promise<IElementChildren>;
    getParent(tree: TreeNode, element: IElement): Promise<IElementParent>;
  };
  dnd: ITreeDnd;
  renderer: {
    getHeight(tree: TreeNode, element: IElement): number;
    renderTemplate(
      tree: TreeNode,
      templateId: ITemplateId,
      container: IContainer
    ): IFileTemplate;
    renderElement(
      tree: TreeNode,
      element: IElement,
      templateId: ITemplateId,
      templateData: ITemplateData
    ): void;
    disposeTemplate(
      tree: TreeNode,
      templateId: ITemplateId,
      templateData: ITemplateData
    ): void;
  };
}

interface ITreeDnd {}
interface IElement {
  key: IElementKey;
  children: IElementChildren;
  parent: IElementParent;
}
interface IFileTemplate {}
type IElementKey = unknown;
type IElementChildren = unknown;
type IElementParent = unknown;
type ITemplateId = unknown;
type ITemplateData = unknown;
type IContainer = unknown;
