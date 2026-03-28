import { Category } from "./Category";

export interface Article {
  _id: string;
  name: string;
  categories: Category[];
  date?: Date;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
