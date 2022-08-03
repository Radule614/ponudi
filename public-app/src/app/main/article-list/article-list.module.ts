import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ArticleItemComponent } from "./article-item/article-item.component";
import { ArticleListComponent } from "./article-list.component";
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CustomPaginatorIntl } from "./paginator-intl";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleItemComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [ArticleListComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl}],
})
export class ArticleListModule {}