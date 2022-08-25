import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormArray, UntypedFormGroup } from "@angular/forms";
import { AdditionalField, FieldType } from "src/app/model/article.model";
import { Filter, FilterGroup } from "src/app/model/filter.model";
import { FilterGroupPipe } from "src/app/shared/pipes/filter-group.pipe";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  @Input() fields: AdditionalField[] = [];


  constructor() { }
  ngOnInit(): void {}

  getSearchFilterGroup() {
    const searchFieldList = this.fields.filter(field => field.type == FieldType.SEARCH);
    let filters: Filter[] = [];
    for(let field of searchFieldList){
      filters.push(new Filter(field.field));
    }
    return new FilterGroup(FieldType.SEARCH, filters);
  }

  
}