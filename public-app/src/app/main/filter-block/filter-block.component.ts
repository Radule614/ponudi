import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { UntypedFormArray, UntypedFormGroup } from "@angular/forms";
import { FieldType } from "src/app/model/article.model";
import { FilterGroup } from "src/app/model/filter.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss']
})
export class FilterBlockComponent extends UnsubscribeComponent implements OnInit, OnChanges {
  @Input() filterGroups: FilterGroup[];
  @Input() categoryId: string;
  @Output() filterSubmitEvent: EventEmitter<Object> = new EventEmitter();

  standardsArray: UntypedFormArray;
  additionalsArray: UntypedFormArray;
  form: UntypedFormGroup;
  standardFilterGroups: FilterGroup[];

  constructor() { super() }
  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryId'] && changes['filterGroups']) {
      this.setupForm();
    }
  }

  setupForm(): void {
    this.standardFilterGroups = [
      { type: FieldType.SEARCH, filters: [{ field: 'content' }], title: 'Naslov' },
      { type: FieldType.DOUBLE_SLIDER, filters: [{ field: 'price', range: { from: 0, to: 100 } }], title: 'Cijena' }
    ];
    this.standardsArray = new UntypedFormArray([]);
    this.additionalsArray = new UntypedFormArray([]);
    this.form = new UntypedFormGroup({
      standardArray: this.standardsArray,
      formArray: this.additionalsArray
    });
    for (let _ of this.standardFilterGroups) {
      this.standardsArray.push(new UntypedFormGroup({}));
    }
    for (let _ of this.filterGroups) {
      this.additionalsArray.push(new UntypedFormGroup({}));
    }
  }

  getFormFromArray(array: UntypedFormArray, index: number): UntypedFormGroup {
    return array.at(index) as UntypedFormGroup;
  }

  onSubmit(): void {
    const standardParams = this.createParamsObject(this.standardFilterGroups, this.standardsArray.controls as UntypedFormGroup[]);
    const additionalParams = this.createParamsObject(this.filterGroups, this.additionalsArray.controls as UntypedFormGroup[]);
    this.filterSubmitEvent.emit({ ...standardParams, ...additionalParams });
  }

  createParamsObject(filterGroups: FilterGroup[], formGroups: UntypedFormGroup[]): Object {
    let params: Object = {};
    filterGroups.forEach((group, index) => {
      const formGroupRaw = formGroups[index].getRawValue();
      switch (group.type) {
        case FieldType.SEARCH: {
          for (let filter of group.filters) {
            const value = formGroupRaw[filter.field];
            if (value) {
              params[filter.field] = value;
            }
          }
          break;
        }
        case FieldType.DOUBLE_SLIDER: {
          for (let filter of group.filters) {
            const from = formGroupRaw[filter.field][0];
            const to = formGroupRaw[filter.field][1];
            if (filter.range?.from != from || filter.range?.to != to) {
              params[`${filter.field}[from]`] = from;
              params[`${filter.field}[to]`] = to;
            }
          }
          break;
        }
        case FieldType.CHECKBOX: {
          let fieldName: string | null = null;
          const filters = group.filters;
          if (filters.length > 0) {
            fieldName = filters[0].field;
          }
          let temp = '';
          let count = 0;
          for (let filter of group.filters) {
            if (filter.value && formGroupRaw[filter.value] === true) {
              if (count != 0) temp += ',';
              temp += filter.value;
              count += 1;
            }
          };
          if (fieldName != null && temp != "") {
            params[fieldName] = temp;
          }
          break;
        }
      }
    })
    return params;
  }
}