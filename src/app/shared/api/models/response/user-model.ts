import {PersonModel} from "./person-model";

export interface UserModel {
  id: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  lockoutEnd: Date;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  createdDate: Date;
  personId: string;
  userType: number;
  enabled: boolean;

  person: PersonModel;
}
