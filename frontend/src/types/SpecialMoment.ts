import { DiaryArticle } from "./Article";
import { People } from "./People";

export enum RateLevel {
  LEVEL_1 = "LEVEL_1",
  LEVEL_2 = "LEVEL_2",
  LEVEL_3 = "LEVEL_3",
  LEVEL_4 = "LEVEL_4",
}

export interface MomentBase {
  _id: string;
  name: string;
  date?: Date;
  withs?: Array<string | People>;
  dairyArticle?: string | DiaryArticle;
  rate: RateLevel;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SpecialMoment extends MomentBase {}
