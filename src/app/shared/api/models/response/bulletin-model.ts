export interface BulletinModel {
  directoryId: string;
  createdById: string;
  createdByName: string;
  createdDate: Date;
  expireDate?: Date;
  title: string;
  detail: string;
  private: boolean;
  approved: boolean;
}
