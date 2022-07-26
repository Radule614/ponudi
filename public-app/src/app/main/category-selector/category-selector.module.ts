import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import { CategorySelectorItem } from "./category-selector-item/category-selector-item.component";
import { CategorySelectorList } from "./category-selector-list/category-selector-list.component";
import { CategorySelector } from "./category-selector.component";

@NgModule({
  declarations:[
    CategorySelector,
    CategorySelectorList,
    CategorySelectorItem
  ],
  imports:[
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    CategorySelector
  ]
})
export class CategorySelectorModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas);
    library.addIconPacks(far);
  }
}