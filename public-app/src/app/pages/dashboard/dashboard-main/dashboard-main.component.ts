import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as ArticleSelectors from 'src/app/store/article/article.selectors';
import * as FromArticle from 'src/app/store/article/article.actions';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent extends UnsubscribeComponent implements OnInit {
  articles: Article[] = [];

  constructor(private store: Store<AppState>){ super() }

  ngOnInit(): void {
    this.store.dispatch(FromArticle.fetchAllByUser())
    this.addToSubs = this.store.select(ArticleSelectors.selectAll).subscribe(data => {
      this.articles = data;
    })
  }
}