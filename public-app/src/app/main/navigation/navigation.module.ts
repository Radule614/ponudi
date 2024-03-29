import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavCategoryItemComponent } from "./nav-category-item/nav-category-item.component";
import { NavCategoryListComponent } from "./nav-category-list/nav-category-list.component";
import { NavigationComponent } from "./navigation.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    NavigationComponent,
    NavCategoryListComponent,
    NavCategoryItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule {}