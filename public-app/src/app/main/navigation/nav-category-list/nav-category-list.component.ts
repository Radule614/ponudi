import { Component, Input, OnInit } from "@angular/core";
import { Category } from "src/app/model/category.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";

@Component({
  selector: 'app-nav-category-list',
  templateUrl: './nav-category-list.component.html',
  styleUrls: ['../shared-styles.scss', './nav-category-list.component.scss']
})
export class NavCategoryListComponent extends UnsubscribeComponent implements OnInit {
  @Input() categories: Category[];
  @Input() mainNav: boolean;
  @Input() depth: number = 0;

  constructor() { super() }
  ngOnInit(): void {}
}