import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedFormsModule } from "src/app/shared/shared-forms.module";
import { SharedModule } from "src/app/shared/shared.module";
import { FilterBlockComponent } from "./filter-block.component";
import { FilterGroupComponent } from "./filter-group/filter-group.component";

@NgModule({
  declarations: [FilterBlockComponent, FilterGroupComponent],
  imports: [
    CommonModule,
    SharedFormsModule,
    SharedModule
  ],
  exports: [FilterBlockComponent]
})
export class FilterBlockModule {}