import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomRadioComponent } from './custom-radio/custom-radio.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomRadioComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomInputComponent,
    CustomRadioComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
