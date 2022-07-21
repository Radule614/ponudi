import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryName: string = "";
  subs: Subscription[] = [];
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    let sub = this.route.params.subscribe( data => {
      this.categoryName = data['name'];
    })
    this.subs.push(sub);
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }
}