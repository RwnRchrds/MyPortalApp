import {PageResponseModel} from "./page-response-model";
import {BulletinModel} from "./bulletin-model";

export interface BulletinPageResponseModel extends PageResponseModel {
  bulletins: BulletinModel[];
}
