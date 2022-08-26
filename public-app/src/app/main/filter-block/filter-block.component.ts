import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { UntypedFormArray, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FieldType } from "src/app/model/article.model";
import { FilterGroup } from "src/app/model/filter.model";

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss']
})
export class FilterBlockComponent implements OnInit, OnChanges {
  @Input() filterGroups: FilterGroup[];
  @Output() filterSubmitEvent: EventEmitter<Object> = new EventEmitter();

  formArray: UntypedFormArray;
  form: UntypedFormGroup;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.setupForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterGroups']) {
      this.setupForm();
    }
  }

  setupForm(): void {
    this.formArray = new UntypedFormArray([]);
    this.form = new UntypedFormGroup({
      formArray: this.formArray
    });
    for (let _ of this.filterGroups) {
      this.formArray.push(new UntypedFormGroup({}));
    }
  }

  getFormFromArray(index: number): UntypedFormGroup {
    return this.formArray.at(index) as UntypedFormGroup;
  }

  onSubmit(): void {
    const formGroups = this.formArray.controls;
    let params = {};
    this.filterGroups.forEach((group, index) => {
      const formGroupRaw = formGroups[index].getRawValue();
      switch (group.type) {
        case FieldType.SEARCH: {
          for(let filter of group.filters){
            const value = formGroupRaw[filter.field];
            if(value){
              params[filter.field] = value;
            }
          }
          break;
        }
        case FieldType.DOUBLE_SLIDER: {
          for (let filter of group.filters) {
            const from = formGroupRaw[filter.field][0];
            const to = formGroupRaw[filter.field][1];
            if(filter.range?.from != from){
              params[`${filter.field}[from]`] = from;
            }
            if(filter.range?.to != to){
              params[`${filter.field}[to]`] = to;
            }
          }
          break;
        }
        case FieldType.CHECKBOX: {
          for (let filter of group.filters) {
            if(filter.value && formGroupRaw[filter.value]===true){
              params[filter.field] = filter.value;
            }
          }
          break;
        }
      }
    })
    this.filterSubmitEvent.emit(params);
  }
}