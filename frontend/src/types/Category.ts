export interface Place {
  _id: string;
  translation?: {
    th?: {
      name?: string;
    };
    en?: {
      name?: string;
    };
  };
  // @deprecated, use translation instead
  name?: string;
}

export interface Category {
  _id: string;
  translation?: {
    th?: {
      name?: string;
    };
    en?: {
      name?: string;
    };
  };
  // @deprecated, use translation instead
  name?: string;
  place: Place;
}
