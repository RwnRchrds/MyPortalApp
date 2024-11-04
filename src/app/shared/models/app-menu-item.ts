import {PermissionMode} from "./permission-mode";
import {MenuItem} from "primeng/api";

export interface AppMenuItem extends MenuItem {
  iconColour?: string;
  permissionsRequired?: number[];
  permissionMode?: PermissionMode;
  items?: AppMenuItem[];
  alwaysVisible?: boolean;
}
