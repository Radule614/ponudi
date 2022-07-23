import { Component, Input } from "@angular/core";
import { Category } from "../../../model/category.model";

@Component({
  selector: 'app-nav-category-list',
  templateUrl: './nav-category-list.component.html',
  styleUrls: ['../shared-styles.scss', './nav-category-list.component.scss']
})
export class NavCategoryListComponent {
  @Input() categories: Category[];
  @Input() mainNav: boolean;

  expanded: boolean = false;
}