import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { OptionItemComponent } from "./option-item/option-item.component";
import { OptionsComponent } from "./options.component";

@NgModule({
  declarations: [
    OptionsComponent,
    OptionItemComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    OptionsComponent
  ]
})
export class OptionsModule {}