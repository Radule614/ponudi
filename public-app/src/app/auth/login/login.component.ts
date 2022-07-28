import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as fromAuth from "src/app/store/auth/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared-styles.scss', './login.component.scss']
})
export class LoginComponent extends UnsubscribeComponent implements OnInit{
  form: UntypedFormGroup;
  errorMessage: string;
  loading: boolean;

  constructor(private store: Store<AppState>){ super() }

  ngOnInit(): void {
    this.store.dispatch(fromAuth.loginClear())
    this.addToSubs = this.store.select('auth').subscribe(state => {
      this.loading = state.loading;
      this.errorMessage = state.loginError;
    });
    this.form = new UntypedFormGroup({
      'username': new UntypedFormControl(null, Validators.required),
      'password': new UntypedFormControl(null, Validators.required)
    });
  }

  onSubmit(): void{
    if(this.form.status == 'VALID'){
      this.store.dispatch(fromAuth.setLoading({loading: true}));
      this.store.dispatch(fromAuth.login({...this.form.getRawValue()}));
    }else{
      this.store.dispatch(fromAuth.loginFailed({message: "all input fields must contain data"}));
    }
  }
}