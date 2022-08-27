import { FieldType } from "./article.model";

export interface Range {
  from: number;
  to: number;
}

export class Filter {
  public readonly field: string;
  public value?: string | number;
  public range?: Range;

  constructor(field: string, value?: string | number) {
    this.field = field;
    if(value){
      this.value = value;
    }
  }
}

export class FilterGroup {
  public readonly type: FieldType;
  public filters: Filter[];
  public title?: string;

  constructor(type: FieldType, filters?: Filter[]) {
    this.type = type;
    if(filters){
      this.filters = filters;
    }else{
      this.filters = [];
    }
  }
}