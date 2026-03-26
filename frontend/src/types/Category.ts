export interface Place {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
  place: Place;
}
