import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/model/user.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as FromAuth from "src/app/store/auth/auth.actions";
import * as AuthSelectors from "src/app/store/auth/auth.selectors";
import * as FromGeneral from "src/app/store/general/general.actions";
import * as GeneralSelectors from "src/app/store/general/general.selectors";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AuthComponent } from "src/app/auth/auth.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends UnsubscribeComponent implements OnInit {
  loggedUser: User | null = null;
  modalRef: MdbModalRef<AuthComponent> | null = null;
  darkTheme: boolean;
  constructor(private store: Store<AppState>, private modalService: MdbModalService) { super() }

  ngOnInit(): void { 
    this.addToSubs = this.store.select(AuthSelectors.selectUser).subscribe(user => {
      console.log(user);
      this.loggedUser = user;
      if(this.loggedUser != null){
        this.modalRef?.close();
      }
    });
    this.addToSubs = this.store.select(GeneralSelectors.selectDarkTheme).subscribe(darkTheme => {
      this.darkTheme = darkTheme;
    });
  }

  logout(): void {
    this.store.dispatch(FromAuth.logout());
  }

  switchTheme(): void {
    this.store.dispatch(FromGeneral.setDarkTheme({ darkTheme: !this.darkTheme }));
  }

  openAuth() {
    this.modalRef = this.modalService.open(AuthComponent, {
      modalClass: 'modal-xl modal-fullscreen-xl-down modal-dialog-centered'
    });
  }

  
}