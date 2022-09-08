import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Icon, icon, LatLng, Marker, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: ['.map-container { height: 500px }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  center: LatLng = new LatLng(44.24, 17.91);
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    minZoom: 8,
    center: this.center
  };
  @Input() layers: Marker[] = [];
  @Output() markerEvent: EventEmitter<LatLng> = new EventEmitter();

  constructor() { }
  ngOnInit() {}
  
  setMarker(event: any): void {
    this.center = new LatLng(event.latlng.lat, event.latlng.lng);
    this.layers.length = 0;
    this.layers.push(this.getNewMarker(this.center));
    this.markerEvent.emit(this.layers[0].getLatLng());
  }

  getNewMarker(latlng: LatLng) {
    return marker(latlng, {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
  }
}