import { Category } from "./Category";

export interface Article {
  name: string;
  category: Category;
  date: Date;
  description: string;
}
