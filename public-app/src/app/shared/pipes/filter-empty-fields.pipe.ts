import { Pipe } from "@angular/core";

@Pipe({name: 'filterEmptyFields'})
export class FilterEmptyFieldsPipe {
  constructor() {}

  transform(fields: any) {
    let temp = {};
    for(let key in fields){
      if(fields[key] != null){
        temp[key] = fields[key];
      }
    }
    return temp;
  }
}