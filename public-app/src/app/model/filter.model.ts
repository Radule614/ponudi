import { FieldType } from "./article.model";

export interface Range {
  from: number;
  to: number;
}

export const standardFilters: Filter[] = [
  {
    field: 'price',
    type: FieldType.DOUBLE_SLIDER
  },
  {
    field: 'content',
    type: FieldType.SEARCH
  }
]

export class Filter {
  public readonly field: string;
  public readonly type: FieldType;
  public value?: string | number;
  public range?: Range;

  constructor(field:string, type: FieldType){
    this.field = field;
    this.type = type;
  }
}