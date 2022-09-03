import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { AdminComponent } from "./admin.component";
import { CategoryCrudComponent } from "./category-crud/category-crud.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedFormsModule } from "src/app/shared/shared-forms.module";
import { OptionsModule } from "src/app/main/options/options.module";
import { CategorySelectorModule } from "src/app/main/category-selector/category-selector.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AdminComponent,
    AdminMainComponent,
    CategoryCrudComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
    SharedFormsModule,
    OptionsModule,
    CategorySelectorModule,
    CommonModule
  ]
})
export class AdminModule {}