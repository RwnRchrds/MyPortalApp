export interface PersonModel {
  id: string;
  directoryId: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredFirstName: string;
  preferredLastName: string;
  photoId: string;
  nhsNumber: string;
  createDate: Date;
  gender: string;
  dob: Date;
  deceased: Date;
  ethnicityId: string;
  deleted: boolean;
}
