import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Article } from "src/app/model/article.model";
import { AppState } from "src/app/store";
import * as ArticleSelectors from '../../../store/article/article.selectors';
import * as FromArticle from '../../../store/article/article.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryId: string = "";
  subs: Subscription[] = [];

  articles: Article[] = [];

  constructor(private route: ActivatedRoute, private store: Store<AppState>){}

  ngOnInit(): void {
    let sub = this.route.params.subscribe(data => {
      this.categoryId = data['id'];
      this.store.dispatch(FromArticle.fetchAll({ id: this.categoryId }))
    })
    this.subs.push(sub);
    
    sub = this.store.select(ArticleSelectors.selectAll).subscribe(data => {
      this.articles = data;
      console.log(data);
    })
    this.subs.push(sub);
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }
}