import { Category } from "./Category";
import { Image } from "./Image";

export interface Article {
  _id: string;
  name: string;
  categories: Category[];
  date?: Date;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  images?: Image[];
}
