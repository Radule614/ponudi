import { ViewportScroller } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as ArticleSelectors from 'src/app/store/article/article.selectors';

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
  
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private viewPortScroller: ViewportScroller){ super() }

  ngOnInit(): void {
    this.addToSubs = this.store.select(ArticleSelectors.selectAll).subscribe(data => {
      this.articles = data.articles['data'] || data.articles;
      this.page = data.page - 1;
      this.count = 100;
    });
  }

  pageEvent(event: any): void {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: {...this.route.snapshot.queryParams, page: event.pageIndex + 1}});
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}