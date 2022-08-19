import { Component, Input, OnInit } from "@angular/core";
import { Image } from "src/app/model/image.model";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() images: Image[];
  @Input() editable: boolean;
  
  constructor() {}
  ngOnInit(): void {}

  deleteHandler(image: Image): void {
    if(this.editable){
      console.log(image);
    }
  }
}