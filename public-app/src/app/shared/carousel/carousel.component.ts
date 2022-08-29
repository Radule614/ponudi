import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/image.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() slides$: Observable<Image[]>;

  constructor() {}
  ngOnInit(): void {}

  getUrl(image: Image): string {
    return `url("${image.url}")`;
  }
}