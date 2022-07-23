import { Component, Input } from "@angular/core";
import { Category } from "src/app/model/category.model";

@Component({
  selector: 'app-nav-category-item',
  templateUrl: './nav-category-item.component.html',
  styleUrls: ['../shared-styles.scss', './nav-category-item.component.scss']
})
export class NavCategoryItemComponent {
  @Input() category: Category;
  @Input() mainNav: boolean;
}