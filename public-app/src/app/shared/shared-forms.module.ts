import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { GalleryModule } from './gallery/gallery.module';
import { FileUploaderComponent } from './file-uploader/file-uploader';
import { CustomChipsComponent } from './custom-chips/custom-chips.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomSelectComponent,
    CustomTextareaComponent,
    FileUploaderComponent,
    CustomChipsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    FontAwesomeModule,
    NgxSliderModule
  ],
  exports: [
    ReactiveFormsModule,
    CustomInputComponent,
    CustomSelectComponent,
    CustomTextareaComponent,
    MatButtonModule,
    GalleryModule,
    FileUploaderComponent,
    CustomChipsComponent,
    MatCheckboxModule,
    NgxSliderModule,
    MatRadioModule,
  ]
})
export class SharedFormsModule { }
