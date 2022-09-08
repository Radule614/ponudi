import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShopItemComponent } from "./shop-item/shop-item.component";
import { ShopListComponent } from "./shop-list.component";
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CustomPaginatorIntl } from "../../shared/paginator-intl";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    ShopListComponent,
    ShopItemComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule,
    SharedModule
  ],
  exports: [ShopListComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class ShopListModule { }