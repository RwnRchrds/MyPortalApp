export interface RoleModel {
  id: string
  name: string;
  concurrencyStamp: string;
  normalizedName: string;
  description: string;
  permissions: ArrayBuffer;
  system: boolean;
}
