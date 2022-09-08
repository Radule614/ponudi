import { ViewportScroller } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import * as ShopSelectors from 'src/app/store/shop/shop.selectors';
import * as FromArticle from 'src/app/store/article/article.actions';
import { Shop } from "src/app/model/shop.model";
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  @Input() editable: boolean = false;
  count: number = 0;
  page: number = 0;
  loading$: Observable<boolean> = this.store.select(ShopSelectors.selectLoading);
  shops$:Observable<Shop[]> = this.store.select(ShopSelectors.selectAll).pipe(
    map(data => {
      this.page = data.page - 1;
      this.count = data.count;
      return data.shops;
    })
  );
  
  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router, private viewPortScroller: ViewportScroller){ }

  ngOnInit(): void {}

  pageEvent(event: any): void {
    this.store.dispatch(FromArticle.activateLoading());
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: {...this.route.snapshot.queryParams, page: event.pageIndex + 1}});
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}