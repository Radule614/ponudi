import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-category-crud',
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.scss']
})
export class CategoryCrudComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
   
    this.route.url.subscribe(data => {
      console.log(this.route.children);
     
    });
  }

}