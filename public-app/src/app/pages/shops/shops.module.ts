import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShopsRoutingModule } from "./shops-routing.module";
import { ShopsComponent } from "./shops.component";

@NgModule({
  declarations: [ShopsComponent],
  imports: [
    ShopsRoutingModule,
    CommonModule
  ]
})
export class ShopsModule {}