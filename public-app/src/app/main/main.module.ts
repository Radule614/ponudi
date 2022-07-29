import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import { NavigationModule } from "./navigation/navigation.module";
import { SharedModule } from "../shared/shared.module";
import { CategorySelectorModule } from "./category-selector/category-selector.module";
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { FilterBlockComponent } from "./filter-block/filter-block.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { HeaderComponent } from "./header/header.component";
import { ArticleItemComponent } from "./article-list/article-item/article-item.component";
import { OptionsModule } from "./options/options.module";

export const allIconNames: any = [];

@NgModule({
  declarations: [
    FilterBlockComponent,
    ArticleItemComponent,
    ArticleListComponent,
    FilterBlockComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FontAwesomeModule,
    NavigationModule,
    SharedModule,
    CategorySelectorModule,
    MdbModalModule,
    OptionsModule
  ],
  exports: [
    CommonModule, 
    FontAwesomeModule,
    CategorySelectorModule,
    NavigationModule,
    HeaderComponent,
    ArticleListComponent,
    FilterBlockComponent,
    OptionsModule
  ]
})
export class MainModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas);
    library.addIconPacks(far);
    for(let icon in fas){
      allIconNames.push(fas[icon].iconName)
    }
  }
}