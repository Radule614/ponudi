import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { FilterBlockComponent } from "./filter-block.component";
import { FilterGroupComponent } from "./filter-group/filter-group.component";

@NgModule({
  declarations: [FilterBlockComponent, FilterGroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [FilterBlockComponent]
})
export class FilterBlockModule {}