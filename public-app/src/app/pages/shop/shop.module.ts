import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShopRoutingModule } from "./shop-routing.module";
import { ShopComponent } from "./shop.component";

@NgModule({
  declarations: [ShopComponent],
  imports: [
    ShopRoutingModule,
    CommonModule
  ]
})
export class ShopModule {}