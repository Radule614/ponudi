import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormArray, UntypedFormGroup } from "@angular/forms";
import { FilterGroup } from "src/app/model/filter.model";

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss']
})
export class FilterBlockComponent implements OnInit {
  @Input() filterGroups: FilterGroup[];

  formArray: UntypedFormArray;
  form: UntypedFormGroup;

  constructor() { }
  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.formArray = new UntypedFormArray([]);
    this.form = new UntypedFormGroup({
      formArray: this.formArray
    });
    for(let _ of this.filterGroups){
      this.formArray.push(new UntypedFormGroup({}));
    }
  }

  getFormFromArray(index: number): UntypedFormGroup {
    return this.formArray.at(index) as UntypedFormGroup;
  }

  onSubmit(): void {
    console.log(this.form);
  }
}