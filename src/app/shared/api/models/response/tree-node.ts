import {TreeNodeState} from "./tree-node-state";

export interface TreeNode {
  id: string;
  text: string;
  icon: string;
  state: TreeNodeState,
  children: TreeNode[]
}
