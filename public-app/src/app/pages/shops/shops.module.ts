import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShopListModule } from "src/app/main/shop-list/shop-list.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ShopsRoutingModule } from "./shops-routing.module";
import { ShopsComponent } from "./shops.component";

@NgModule({
  declarations: [ShopsComponent],
  imports: [
    ShopsRoutingModule,
    CommonModule,
    SharedModule,
    ShopListModule
  ]
})
export class ShopsModule {}