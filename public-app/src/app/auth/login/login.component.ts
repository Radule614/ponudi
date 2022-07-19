import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import { login } from "src/app/store/auth/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared-styles.scss', './login.component.scss']
})
export class LoginComponent implements OnInit{
  form: UntypedFormGroup;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      'username': new UntypedFormControl(null, Validators.required),
      'password': new UntypedFormControl(null, Validators.required)
    });
  }
  
  onSubmit(){
    if(this.form.status == 'VALID'){
      this.store.dispatch(login({...this.form.getRawValue()}));
    }else{
      console.log(this.form.status)
    }
  }
}