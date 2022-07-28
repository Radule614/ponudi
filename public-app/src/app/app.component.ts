import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnsubscribeComponent } from './shared/unsubscribe/unsubscribe.component';
import { AppState } from './store';
import * as FromAuth from './store/auth/auth.actions';
import * as FromCategory from './store/category/category.actions';
import * as GeneralSelectors from './store/general/general.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends UnsubscribeComponent implements OnInit {
  title = 'rooster';
  appLoading: boolean = false;

  constructor(private store: Store<AppState>){ super() }

  ngOnInit(): void {
    this.addToSubs = this.store.select(GeneralSelectors.selectLoading).subscribe(loading => {
      this.appLoading = loading;
    });

    this.store.dispatch(FromAuth.checkAuth());
    this.store.dispatch(FromCategory.fetchAll());
  }
}
