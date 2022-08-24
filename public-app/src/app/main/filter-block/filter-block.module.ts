import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { FilterBlockComponent } from "./filter-block.component";
import { FilterItemComponent } from "./filter-item/filter-item.component";

@NgModule({
  declarations: [FilterBlockComponent, FilterItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [FilterBlockComponent]
})
export class FilterBlockModule {}