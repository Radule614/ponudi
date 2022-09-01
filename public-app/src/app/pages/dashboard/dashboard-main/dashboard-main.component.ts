import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as FromArticle from 'src/app/store/article/article.actions';
import * as AuthSelectors from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent extends UnsubscribeComponent implements OnInit {
  constructor(private store: Store<AppState>, private route: ActivatedRoute){ super() }

  ngOnInit(): void {
    this.addToSubs = combineLatest([this.route.queryParams, this.store.select(AuthSelectors.selectUser)]).subscribe(([params, user]) => {
      if(user){
        this.store.dispatch(FromArticle.fetchAllByUser({ userId: user._id, page: params['page'] }))
      }
    });
  }
}