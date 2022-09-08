import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, Observable, tap } from "rxjs";
import { AppState } from "src/app/store";
import * as FromShop from 'src/app/store/shop/shop.actions';
import * as AuthSelectors from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-user-shops',
  templateUrl: './user-shops.component.html',
  styleUrls: ['./user-shops.component.scss']
})
export class UserShopsComponent implements OnInit {

  params$: Observable<any> = combineLatest([this.route.queryParams, this.store.select(AuthSelectors.selectUser)]).pipe(
    tap(([params, user]) => {
      if(user){
        this.store.dispatch(FromShop.fetchAllByUser({ userId: user._id, page: params['page'] }))
      }
    })
  );

  constructor(private store: Store<AppState>, private route: ActivatedRoute){ }
  ngOnInit(): void {}
}