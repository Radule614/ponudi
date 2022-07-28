import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomRadioComponent } from './custom-radio/custom-radio.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomRadioComponent,
    CustomSelectComponent,
    CustomTextareaComponent,
    UnsubscribeComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomInputComponent,
    CustomRadioComponent,
    CustomSelectComponent,
    CustomTextareaComponent,
    UnsubscribeComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
