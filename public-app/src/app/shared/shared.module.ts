import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FilterEmptyFieldsPipe } from './pipes/filter-empty-fields.pipe';
import { RichtextDecoderPipe } from './pipes/richtext-decode.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterGroupPipe } from './pipes/filter-group.pipe';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { NgLetModule } from 'ng-let';

@NgModule({
  declarations: [
    UnsubscribeComponent,
    SpinnerComponent,
    ConfirmModalComponent,
    SafeHtmlPipe,
    FilterEmptyFieldsPipe,
    RichtextDecoderPipe,
    FilterGroupPipe,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    MatButtonModule,
    NgLetModule 
  ],
  exports: [
    UnsubscribeComponent,
    SpinnerComponent,
    ConfirmModalComponent,
    SafeHtmlPipe,
    FilterEmptyFieldsPipe,
    RichtextDecoderPipe,
    FilterGroupPipe,
    CarouselComponent,
    FontAwesomeModule,
    NgbModule,
    MatButtonModule,
    NgLetModule
  ]
})
export class SharedModule { }
