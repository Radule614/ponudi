import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MainModule } from "../main/main.module";
import { SharedModule } from "../shared/shared.module";
import { AccountComponent } from "./account/account.component";
import { AdminModule } from "./admin/admin.module";
import { ArticleComponent } from "./article/article.component";
import { CategoryFilterComponent } from "./category/category-filter.component.html/category-filter.component";
import { CategoryComponent } from "./category/category.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ExploreComponent } from "./explore/explore.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ProfileComponent } from "./profile/profile.component";
import { ShopsComponent } from "./shops/shops.component";

@NgModule({
  declarations: [
    AccountComponent,
    CategoryComponent,
    ArticleComponent,
    ExploreComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ShopsComponent,
    CategoryFilterComponent,
  ],
  imports: [
    MainModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    AdminModule,
    DashboardModule
  ],
  exports: []
})
export class PagesModule {
  
}