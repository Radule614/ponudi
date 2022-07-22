import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { CategoryComponent } from "./pages/category/category.component";
import { AccountComponent } from "./pages/account/account.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ExploreComponent } from "./pages/explore/explore.component";
import { HomeComponent } from "./pages/home/home.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ShopsComponent } from "./pages/shops/shops.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleItemComponent } from "./article-list/article-item/article-item.component";
import { NavCategoryListComponent } from "./navigation/nav-category-list/nav-category-list.component";
import { NavCategoryItemComponent } from "./navigation/nav-category-item/nav-category-item.component";
import { NavCategoryExpanderComponent } from "./navigation/nav-category-expander/nav-category-expander.component";

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    NavigationComponent,
    NavCategoryListComponent,
    NavCategoryItemComponent,
    NavCategoryExpanderComponent,
    CategoryComponent,
    AccountComponent,
    DashboardComponent,
    ExploreComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ShopsComponent,
    ArticleListComponent,
    ArticleItemComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FontAwesomeModule,
    MainRoutingModule
  ],
  exports: [MainComponent]
})
export class MainModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas);
    library.addIconPacks(far);
  }
}