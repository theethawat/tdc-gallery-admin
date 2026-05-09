import { People } from "./People";

export enum GiftMode {
  GIVER = "GIVER",
  RECEIVER = "RECEIVER",
}

export interface Gift {
  _id: string;
  name: string;
  date?: Date;
  mode: GiftMode;
  giver?: string | People;
  receivers?: Array<string | People>;
  occasion?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
