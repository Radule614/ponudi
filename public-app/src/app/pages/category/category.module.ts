import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ArticleListModule } from "src/app/main/article-list/article-list.module";
import { FilterBlockModule } from "src/app/main/filter-block/filter-block.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CategoryFilterComponent } from "./category-filter.component.html/category-filter.component";
import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryComponent } from "./category.component";

@NgModule({
  declarations: [CategoryComponent, CategoryFilterComponent],
  imports: [
    CategoryRoutingModule,
    SharedModule,
    ArticleListModule,
    FilterBlockModule,
    CommonModule
  ]
})
export class CategoryModule {}