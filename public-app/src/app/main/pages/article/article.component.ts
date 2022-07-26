import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Article } from "src/app/model/article.model";
import { AppState } from "src/app/store";
import * as ArticleSelectors from '../../../store/article/article.selectors';
import * as FromArticle from '../../../store/article/article.actions';
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  article: Article | null;
  articleId: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>){}

  ngOnInit(): void {
    let sub = this.route.params.subscribe(data => {
      this.articleId = data['id'];
      this.store.dispatch(FromArticle.fetchArticle({ id: this.articleId }))
    })
    this.subs.push(sub);
    
    sub = this.store.select(ArticleSelectors.selectArticle).subscribe(data => {
      this.article = data;
      console.log(data);
    })
    this.subs.push(sub);
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }
}