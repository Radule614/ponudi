import { Pipe } from "@angular/core";
import { AdditionalField } from "src/app/model/article.model";
import { Filter } from "src/app/model/filter.model";

@Pipe({name: 'fieldIntoFilter'})
export class FieldIntoFilterPipe {
  constructor() {}

  transform(fields: AdditionalField[]) {
    let temp:Filter[] = [];
    for(let field of fields){
      temp.push({
        field: field.field,
        type: field.type
      });
    }
    return temp;
  }
}