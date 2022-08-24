import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { AdditionalField } from "src/app/model/article.model";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  @Input() fields: AdditionalField[] = [];

  searchForm: UntypedFormGroup = new UntypedFormGroup({});
  constructor() { }
  ngOnInit(): void { }
}