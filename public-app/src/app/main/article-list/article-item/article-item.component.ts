import { ViewportScroller } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Article } from "src/app/model/article.model";

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit{
  @Input() article: Article;
  @Input() editable: boolean = false;

  constructor(private viewportScroller: ViewportScroller){}

  ngOnInit(): void { }

  btnDetailsClick(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}