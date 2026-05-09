import { Category } from "./Category";
import { Image } from "./Image";
import { People } from "./People";

export interface Article {
  _id: string;
  name: string;
  categories: Category[];
  date?: Date;
  description: string;
  high_privacy?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  images?: Image[];
}

export interface GalleryArticle extends Article {}

export interface DiaryArticle extends Article {
  withs?: People[];
  gallery?: string | GalleryArticle;
}
