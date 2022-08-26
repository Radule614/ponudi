import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdditionalField, FieldType } from "src/app/model/article.model";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  @Input() fields: AdditionalField[] = [];
  @Input() categoryId: string;

  constructor(private router: Router) { }
  ngOnInit(): void {}

  filterSubmitHandler(params: Object){
    this.router.navigate(
      ['/category', this.categoryId],
      { queryParams: params }
    );
  }
}