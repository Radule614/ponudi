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