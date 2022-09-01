import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GalleryItemComponent } from "./gallery-item/gallery-item.component";
import { GalleryComponent } from "./gallery.component";

@NgModule({
  declarations: [GalleryComponent, GalleryItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  exports: [GalleryComponent]
})
export class GalleryModule {}