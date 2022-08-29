import { Options } from "@angular-slider/ngx-slider";
import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { FieldType } from "src/app/model/article.model";
import { FilterGroup } from "src/app/model/filter.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";

@Component({
  selector: 'app-filter-group',
  templateUrl: './filter-group.component.html',
  styleUrls: ['./filter-group.component.scss']
})
export class FilterGroupComponent extends UnsubscribeComponent implements OnInit {
  @Input() filterGroup: FilterGroup;
  @Input() form: UntypedFormGroup;

  FieldType = FieldType;

  sliderOptions: Options = {
    floor: 0,
    ceil: 0
  };

  constructor(private route: ActivatedRoute) { super() }
  ngOnInit(): void {
    this.setupForm();
    this.addToSubs = this.route.queryParams.subscribe(params => {
      switch (this.filterGroup.type) {
        case FieldType.SEARCH: {
          for (let filter of this.filterGroup.filters) {
            const fieldParam = this.findAllParamByField(params, filter.field);
            if (fieldParam) {
              this.form.controls[filter.field].setValue(fieldParam);
            }
          }
          break;
        }
        case FieldType.DOUBLE_SLIDER: {
          for (let filter of this.filterGroup.filters) {
            const from = this.findAllParamByField(params, `${filter.field}[from]`);
            const to = this.findAllParamByField(params, `${filter.field}[to]`);
            const control = this.form.controls[filter.field];
            if(from) control.setValue([parseInt(from), control.value[1]]);
            if(to) control.setValue([control.value[0], parseInt(to)]);
          }
          break;
        }
        case FieldType.CHECKBOX: {
          for (let filter of this.filterGroup.filters) {
            const checkboxParam = this.findAllParamByField(params, filter.field);
            if(checkboxParam){
              const checkboxArr = checkboxParam.split(',');
              for(let value of checkboxArr){
                if(filter.value == value){
                  this.form.controls[filter.value].setValue(true);
                  break;
                }
              }
            }
          }
          break;
        }
      }
    });
  }

  setupForm(): void {
    switch (this.filterGroup.type) {
      case FieldType.SEARCH: {
        for (let filter of this.filterGroup.filters) {
          this.form.addControl(filter.field, new UntypedFormControl(null));
        }
        break;
      }
      case FieldType.DOUBLE_SLIDER: {
        for (let filter of this.filterGroup.filters) {
          const from = filter.range?.from;
          const to = filter.range?.to;
          this.form.addControl(filter.field, new UntypedFormControl([from, to]));
          const newOptions: Options = Object.assign({}, this.sliderOptions);
          newOptions.floor = from
          newOptions.ceil = to;
          this.sliderOptions = newOptions;
        }
        break;
      }
      case FieldType.CHECKBOX: {
        for (let filter of this.filterGroup.filters) {
          this.form.addControl(filter.value + '', new UntypedFormControl(null));
        }
        break;
      }
    }
  }

  findAllParamByField(params: Object, field: string): string | null {
    for (let key in params) {
      if (key == field) {
        return params[key];
      }
    }
    return null;
  }

  get title(){
    if(this.filterGroup.title) return this.filterGroup.title;
    switch(this.filterGroup.type){
      case FieldType.SEARCH:
        return 'Pretrage';
      case FieldType.DOUBLE_SLIDER:
        return 'Slajderi';
      case FieldType.CHECKBOX:{
        const filters = this.filterGroup.filters;
        if(filters.length>0){
          return filters[0].field;
        }
        break;
      }
    }
    return "";
  }
}