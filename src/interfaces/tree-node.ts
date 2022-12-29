export interface ITreeNode {
  content: string;
  full_name: string;
  icon: string;
  isFile: boolean;
  isFileActive: boolean;
  isFileOpen: boolean;
  isFolder: boolean;
  isFolderOpen: boolean;
  isSelected: boolean;
  items?: ITreeNode[];
  name: string;
  parent?: ITreeNode;
}
