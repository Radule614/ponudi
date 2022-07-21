import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import User from "../model/user.model";
import { logout } from "../store/auth/auth.actions";
import { selectUser } from "../store/auth/auth.selectors";
import { AppState } from "../store/index";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  loggedUser: User | null = null;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { 
    let sub = this.store.select(selectUser).subscribe(user => {
      this.loggedUser = user;
      console.log(user);
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}