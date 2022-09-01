import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { CategorySelectorItem } from "./category-selector-item/category-selector-item.component";
import { CategorySelectorList } from "./category-selector-list/category-selector-list.component";
import { CategorySelectorComponent } from "./category-selector.component";

@NgModule({
  declarations:[
    CategorySelectorComponent,
    CategorySelectorList,
    CategorySelectorItem
  ],
  imports:[
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CategorySelectorComponent
  ]
})
export class CategorySelectorModule { }