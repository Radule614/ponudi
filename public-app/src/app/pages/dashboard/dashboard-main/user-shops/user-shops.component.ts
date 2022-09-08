import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as FromShop from 'src/app/store/shop/shop.actions';
import * as AuthSelectors from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-user-shops',
  templateUrl: './user-shops.component.html',
  styleUrls: ['./user-shops.component.scss']
})
export class UserShopsComponent extends UnsubscribeComponent implements OnInit {
  constructor(private store: Store<AppState>, private route: ActivatedRoute){ super() }

  ngOnInit(): void {
    this.addToSubs = combineLatest([this.route.queryParams, this.store.select(AuthSelectors.selectUser)]).subscribe(([params, user]) => {
      if(user){
        this.store.dispatch(FromShop.fetchAllByUser({ userId: user._id, page: params['page'] }))
      }
    });
  }
}