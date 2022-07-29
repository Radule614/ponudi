import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { User } from "src/app/model/user.model";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as fromAuth from "src/app/store/auth/auth.actions";
import * as authSelectors from "src/app/store/auth/auth.selectors";
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
  
  constructor(private store: Store<AppState>, private modalService: MdbModalService) { super() }

  ngOnInit(): void { 
    this.addToSubs = this.store.select(authSelectors.selectUser).subscribe(user => {
      console.log(user);
      this.loggedUser = user;
      if(this.loggedUser != null){
        this.modalRef?.close();
      }
    });
  }

  logout(): void {
    this.store.dispatch(fromAuth.logout());
  }

  openAuth() {
    this.modalRef = this.modalService.open(AuthComponent, {
      modalClass: 'modal-xl modal-fullscreen-xl-down modal-dialog-centered'
    });
  }
}