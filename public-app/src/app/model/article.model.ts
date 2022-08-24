

export const enum FieldType { CHECKBOX = 0, DOUBLE_SLIDER = 1, SEARCH = 2 }

export interface AdditionalField {
  field: string,
  type: FieldType
}

export class Article {
  _id: string;
  content: string;
  price: number;
  owner?: string | null;
  description?: string | null;
  pictures?: any[];
  category?: string | null;
  current?: string | null;
  currency?: string | null;
  additionalFields?: Object;

  constructor() {}
}