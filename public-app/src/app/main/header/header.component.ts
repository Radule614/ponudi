import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { User } from "src/app/model/user.model";
import { AppState } from "src/app/store";
import * as fromAuth from "src/app/store/auth/auth.actions";
import * as authSelectors from "src/app/store/auth/auth.selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedUser: User | null = null;
  subs: Subscription[] = [];
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { 
    let sub = this.store.select(authSelectors.selectUser).subscribe(user => {
      this.loggedUser = user;
      console.log(user);
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }

  logout(): void {
    this.store.dispatch(fromAuth.logout());
  }
}