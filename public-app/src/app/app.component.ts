import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import * as fromAuth from './store/auth/auth.actions';
import * as fromCategory from './store/category/category.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rooster';

  constructor(private store: Store<AppState>, private router: Router){}

  ngOnInit(): void {
    this.store.dispatch(fromAuth.checkAuth());
    this.store.dispatch(fromCategory.fetchAll());

    console.log(this.router.config);
  }
}
