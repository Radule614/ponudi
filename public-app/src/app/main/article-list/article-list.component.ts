import { ViewportScroller } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as ArticleSelectors from 'src/app/store/article/article.selectors';
import * as FromArticle from 'src/app/store/article/article.actions';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent extends UnsubscribeComponent implements OnInit {
  @Input() editable: boolean = false;
  articles: Article[];
  count: number = 0;
  page: number = 0;
  articlesLoading: boolean = false;
  
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private viewPortScroller: ViewportScroller){ super() }

  ngOnInit(): void {
    this.addToSubs = this.store.select(ArticleSelectors.selectLoading).subscribe(loading => { this.articlesLoading = loading });
    this.addToSubs = this.store.select(ArticleSelectors.selectAll).subscribe(data => {
      this.articles = data.articles;
      this.page = data.page - 1;
      this.count = data.count;
    });
  }

  pageEvent(event: any): void {
    this.store.dispatch(FromArticle.activateLoading());
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: {...this.route.snapshot.queryParams, page: event.pageIndex + 1}});
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}