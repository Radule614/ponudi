import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { GalleryModule } from './gallery/gallery.module';
import { FileUploaderComponent } from './file-uploader/file-uploader';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FilterEmptyFieldsPipe } from './pipes/filter-empty-fields.pipe';
import { RichtextDecoderPipe } from './pipes/richtext-decode.pipe';
import { CustomChipsComponent } from './custom-chips/custom-chips.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterGroupPipe } from './pipes/filter-group.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomSelectComponent,
    CustomTextareaComponent,
    UnsubscribeComponent,
    SpinnerComponent,
    ConfirmModalComponent,
    FileUploaderComponent,
    SafeHtmlPipe,
    FilterEmptyFieldsPipe,
    RichtextDecoderPipe,
    CustomChipsComponent,
    FilterGroupPipe,
    CarouselComponent
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
    NgxSliderModule,
    NgbModule
  ],
  exports: [
    CustomInputComponent,
    CustomSelectComponent,
    CustomTextareaComponent,
    UnsubscribeComponent,
    SpinnerComponent,
    MatButtonModule,
    ConfirmModalComponent,
    GalleryModule,
    FileUploaderComponent,
    SafeHtmlPipe,
    FilterEmptyFieldsPipe,
    RichtextDecoderPipe,
    CustomChipsComponent,
    FilterGroupPipe,
    MatCheckboxModule,
    NgxSliderModule,
    CarouselComponent
  ]
})
export class SharedModule { }
