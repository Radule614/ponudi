import { Component, OnInit } from "@angular/core";
import { Article } from "src/app/model/article.model";
import { AppState } from "src/app/store";
import * as ArticleSelectors from '../../store/article/article.selectors';
import * as FromArticle from '../../store/article/article.actions';
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends UnsubscribeComponent implements OnInit{
  article: Article | null;
  articleId: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>){ super() }

  ngOnInit(): void {
    this.addToSubs = this.route.params.subscribe(data => {
      this.articleId = data['id'];
      this.store.dispatch(FromArticle.fetchArticle({ id: this.articleId }))
    })
    
    this.addToSubs = this.store.select(ArticleSelectors.selectArticle).subscribe(data => {
      this.article = data;
      console.log(data);
    })
  }

}