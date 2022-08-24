import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { FieldType } from "src/app/model/article.model";
import { Filter } from "src/app/model/filter.model";

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss']
})
export class FilterBlockComponent implements OnInit {
  @Input() filters: Filter[] = [
    {
      field: 'kuce_opcija_0',
      type: FieldType.DOUBLE_SLIDER
    },
    {
      field: 'kuce_opcija_0',
      type: FieldType.SEARCH
    },
    {
      field: 'kuce_opcija_0',
      type: FieldType.CHECKBOX
    },
    {
      field: 'kuce_opcija_0',
      type: FieldType.CHECKBOX
    },
    {
      field: 'kuce_opcija_0',
      type: FieldType.CHECKBOX
    }
  ]

  @Input() form: UntypedFormGroup = new UntypedFormGroup({});

  constructor() { }
  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    for(let filter of this.filters){
      this.form.addControl(filter.field, new UntypedFormControl(null));
    }
  }
}