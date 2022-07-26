export class Article {
  content: string;
  price: number;
  owner?: string | null;
  description?: string | null;
  pictures?: any[];
  category?: string | null;
  current?: string | null;

  constructor() {}
}