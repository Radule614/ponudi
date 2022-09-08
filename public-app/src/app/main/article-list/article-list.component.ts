import { ViewportScroller } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import { AppState } from "src/app/store";
import * as ArticleSelectors from 'src/app/store/article/article.selectors';
import * as FromArticle from 'src/app/store/article/article.actions';
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {
  @Input() editable: boolean = false;
  count: number = 0;
  page: number = 0;
  loading$: Observable<boolean> = this.store.select(ArticleSelectors.selectLoading);
  articles$: Observable<Article[]> = this.store.select(ArticleSelectors.selectAll).pipe(
    map(data => {
      this.page = data.page - 1;
      this.count = data.count;
      return data.articles;
    })
  );

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private viewPortScroller: ViewportScroller) { }

  ngOnInit(): void { }

  pageEvent(event: any): void {
    this.store.dispatch(FromArticle.activateLoading());
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { ...this.route.snapshot.queryParams, page: event.pageIndex + 1 } });
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}