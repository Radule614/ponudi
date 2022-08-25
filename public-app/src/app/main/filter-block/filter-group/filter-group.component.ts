import { Options } from "@angular-slider/ngx-slider";
import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { FieldType } from "src/app/model/article.model";
import { FilterGroup } from "src/app/model/filter.model";

@Component({
  selector: 'app-filter-group',
  templateUrl: './filter-group.component.html',
  styleUrls: ['./filter-group.component.scss']
})
export class FilterGroupComponent implements OnInit {
  @Input() filterGroup: FilterGroup;
  @Input() form: UntypedFormGroup;

  FieldType = FieldType;

  sliderOptions: Options = {
    floor:0,
    ceil:0
  };

  constructor() { }
  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    for(let filter of this.filterGroup.filters){
      switch(this.filterGroup.type){
        case FieldType.SEARCH:
          this.form.addControl(filter.field, new UntypedFormControl(null));
          break;
        case FieldType.DOUBLE_SLIDER:
          this.form.addControl(filter.field, new UntypedFormControl([20, 80]));
          const newOptions: Options = Object.assign({}, this.sliderOptions);
          newOptions.floor = filter.range?.from;
          newOptions.ceil = filter.range?.to;
          this.sliderOptions = newOptions;
          break;
        case FieldType.CHECKBOX:
          this.form.addControl(filter.value+'', new UntypedFormControl(null));
          break;
      }
    }
  }
}