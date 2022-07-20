import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/store";
import { login, loginFailed, setLoading } from "src/app/store/auth/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared-styles.scss', './login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  form: UntypedFormGroup;
  errorMessage: string;
  loading: boolean;

  subs: Subscription[] = [];

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    let sub = this.store.select('auth').subscribe(state => {
      this.loading = state.loading;
      this.errorMessage = state.loginError;
    });
    this.subs.push(sub);
    this.form = new UntypedFormGroup({
      'username': new UntypedFormControl(null, Validators.required),
      'password': new UntypedFormControl(null, Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
  
  onSubmit(): void{
    if(this.form.status == 'VALID'){
      this.store.dispatch(setLoading({loading: true}));
      this.store.dispatch(login({...this.form.getRawValue()}));
    }else{
      this.store.dispatch(loginFailed({message: "all input fields must contain data"}));
    }
  }
}