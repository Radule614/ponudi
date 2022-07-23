import { Component, Input, OnInit } from "@angular/core";
import { Article } from "src/app/model/article.model";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  @Input() categoryId: string = "";
  @Input() articles: Article[];

  constructor(){}

  ngOnInit(): void {
    
  }
}