import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { ArticleCrudComponent } from "./article-crud/article-crud.component";
import { DashboardMainComponent } from "./dashboard-main/dashboard-main.component";
import { DashboardComponent } from "./dashboard.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { UserArticlesComponent } from "./dashboard-main/user-articles/user-articles.component";
import { GalleryModule } from "src/app/shared/gallery/gallery.module";
import { SharedFormsModule } from "src/app/shared/shared-forms.module";
import { ArticleListModule } from "src/app/main/article-list/article-list.module";
import { CategorySelectorModule } from "src/app/main/category-selector/category-selector.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMainComponent,
    ArticleCrudComponent,
    UserArticlesComponent
  ],
  imports: [
    CommonModule,
    ArticleListModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule,
    CKEditorModule,
    GalleryModule,
    SharedFormsModule,
    CategorySelectorModule
  ]
})
export class DashboardModule {}