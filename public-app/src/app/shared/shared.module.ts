import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomRadioComponent } from './custom-radio/custom-radio.component';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomRadioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomInputComponent,
    CustomRadioComponent
  ]
})
export class SharedModule { }
