import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from './store';
import * as FromAuth from './store/auth/auth.actions';
import * as FromCategory from './store/category/category.actions';
import * as GeneralSelectors from './store/general/general.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rooster';
  subs: Subscription[] = [];
  appLoading: boolean = false;

  constructor(private store: Store<AppState>, private router: Router){}

  ngOnInit(): void {
    let sub = this.store.select(GeneralSelectors.selectLoading).subscribe(loading => {
      this.appLoading = loading;
    });
    this.subs.push(sub);

    this.store.dispatch(FromAuth.checkAuth());
    this.store.dispatch(FromCategory.fetchAll());
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }
}
