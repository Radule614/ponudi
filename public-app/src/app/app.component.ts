import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { checkAuth } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rooster';

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch(checkAuth());
  }
}
