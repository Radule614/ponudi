import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Icon, icon, LatLng, MapOptions, Marker, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  @Input() editable: boolean = false;
  @Input() dragable: boolean = false;
  @Output() markerEvent: EventEmitter<LatLng> = new EventEmitter();
  @Input() markerLocation: LatLng;
  @Input() fixedZoomLevel: number;
  markerLayers: Marker[] = [];
  center: LatLng = new LatLng(44.24, 17.91);
  options: MapOptions;

  constructor() { }
  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 8,
      minZoom: 8,
      doubleClickZoom: false,
      center: this.markerLocation || this.center
    };
    if (!this.dragable) {
      this.options.dragging = false;
    }
    if (this.fixedZoomLevel) {
      this.setFixedZoom(this.fixedZoomLevel);
      this.options.zoomControl = false;
    }
    if (this.markerLocation) {
      this.markerLayers.push(this.getNewMarker(this.markerLocation));
    }
  }

  setFixedZoom(n: number): void {
    this.options.maxZoom = n;
    this.options.minZoom = n;
    this.options.zoom = n;
    this.options.scrollWheelZoom = false;
  }

  setMarker(event: any): void {
    if (!this.editable) return;

    this.center = new LatLng(event.latlng.lat, event.latlng.lng);
    this.markerLayers.length = 0;
    this.markerLayers.push(this.getNewMarker(this.center));
    this.markerEvent.emit(this.markerLayers[0].getLatLng());
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