import { Category } from "./Category";
import { Image } from "./Image";
import { People } from "./People";

export interface Article {
  _id: string;
  translation?: {
    th?: {
      name?: string;
      description?: string;
    };
    en?: {
      name?: string;
      description?: string;
    };
  };
  date?: Date;
  categories: Category[];
  high_privacy?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  images?: Image[];
  // @deprecated, use translation instead
  name?: string;
  description?: string;
}

export interface GalleryArticle extends Article {}

export interface DiaryArticle extends Article {
  withs?: People[];
  gallery?: string | GalleryArticle;
}
