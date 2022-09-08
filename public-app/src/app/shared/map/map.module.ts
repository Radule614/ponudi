import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [MapComponent],
  imports: [LeafletModule],
  exports: [MapComponent]
})
export class MapModule {}