import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Filter } from "src/app/model/filter.model";

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {
  @Input() filter: Filter;
  @Input() form: UntypedFormGroup;
  constructor() { }
  ngOnInit(): void { }
}