import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Image } from "src/app/model/image.model";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() images: Image[];
  @Input() editable: boolean;
  @Output() deleteEvent: EventEmitter<Image> = new EventEmitter(); 
  
  constructor() {}
  ngOnInit(): void {}

  deleteHandler(image: Image): void {
    if(this.editable){
      let index = this.images.indexOf(image);
      this.images.splice(index, 1);
      this.deleteEvent.emit(image);
    }
  }
}