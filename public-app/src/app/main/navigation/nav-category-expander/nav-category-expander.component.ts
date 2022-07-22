import { Component, Input } from "@angular/core";
import { Category } from "src/app/model/category.model";

@Component({
  selector: 'app-nav-category-expander',
  templateUrl: './nav-category-expander.component.html',
  styleUrls: ['../shared-styles.scss', './nav-category-expander.component.scss']
})
export class NavCategoryExpanderComponent {
  @Input() category: Category;
  @Input() mainNav: boolean;

  expanded: boolean = false;
}