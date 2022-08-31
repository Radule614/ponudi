import { Pipe } from "@angular/core";
import { AdditionalField, FieldType } from "src/app/model/article.model";
import { Filter, FilterGroup } from "src/app/model/filter.model";

@Pipe({ name: 'filterGroup' })
export class FilterGroupPipe {
  constructor() { }

  transform(fields: AdditionalField[]): FilterGroup[] {
    let groups: FilterGroup[] = [];
    let searchGroup = new FilterGroup(FieldType.SEARCH);
    let sliderGroup = new FilterGroup(FieldType.DOUBLE_SLIDER);
    groups.push(searchGroup);
    groups.push(sliderGroup);
    for (let field of fields) {
      switch (field.type) {
        case FieldType.SEARCH:
          searchGroup.filters.push(new Filter(field.field));
          break;
        case FieldType.DOUBLE_SLIDER:
          console.log(field);
          let temp = new Filter(field.field);
          temp.range = { from: 0, to: 100 };
          sliderGroup.filters.push(temp);
          break;
        case FieldType.CHECKBOX: {
          let temp = new FilterGroup(FieldType.CHECKBOX);
          if(field.enum){
            for(let fieldOption of field.enum){
              temp.filters.push(new Filter(field.field, fieldOption));
            }
          }
          groups.push(temp);
          break;
        }
        default:
      }
    }
    return groups;
  }
}