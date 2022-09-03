import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [
    MatButtonModule,
    SharedModule,
    RouterModule,
    CommonModule
  ],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule { }