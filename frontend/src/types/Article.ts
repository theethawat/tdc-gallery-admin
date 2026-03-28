import { Category } from "./Category";

export interface Article {
  _id: string;
  name: string;
  category: Category;
  date: Date;
  description: string;
}
