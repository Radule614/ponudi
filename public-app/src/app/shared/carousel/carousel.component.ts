
import { Component, Input, OnInit } from '@angular/core';  
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/image.model';
@Component({  
  selector: 'app-carousel',  
  templateUrl: './carousel.component.html',  
  styleUrls: ['./carousel.component.scss']  
})  
export class CarouselComponent implements OnInit {  
  @Input() slides$: Observable<Image[]>;
  
  constructor(config: NgbCarouselConfig) {  
    config.interval = 2000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
  }  
  ngOnInit() {  
  }  
}  