import { Component, OnInit } from "@angular/core";
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/store";
import { register, registerFailed, setLoading } from "src/app/store/auth/auth.actions";
import { registerDTO } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../shared-styles.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit{
  form: UntypedFormGroup;
  errorMessages: string[] = [];
  loading: boolean = false;

  subs: Subscription[] = [];

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.parent?.get('password')?.value;
    let confirmPass = group.parent?.get('passwordConfirm')?.value
    return pass === confirmPass ? null : { notSame: true }
  }
  

  constructor(private store: Store<AppState>){}
  
  ngOnInit(): void {
    let sub = this.store.select('auth').subscribe(state => {
      this.loading = state.loading;
      this.errorMessages = state.registerErrors;
    });
    this.subs.push(sub);
    this.form = new UntypedFormGroup({
      'username':         new UntypedFormControl(null, [Validators.required]),
      'email':            new UntypedFormControl(null, [Validators.required, Validators.email]),
      'firstname':        new UntypedFormControl(null, [Validators.required]),
      'lastname':         new UntypedFormControl(null, [Validators.required]),
      'password':         new UntypedFormControl(null, [Validators.required]),
      'passwordConfirm':  new UntypedFormControl(null, [Validators.required, this.checkPasswords]),
      'gender':           new UntypedFormControl(null, [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
  
  onSubmit(){
    if(this.form.status == 'VALID'){
      this.store.dispatch(setLoading({loading: true}));
      let data = {
        username: this.form.getRawValue().username,
        email: this.form.getRawValue().email,
        name: this.form.getRawValue().firstname,
        surname: this.form.getRawValue().lastname,
        password: this.form.getRawValue().password,
        gender: this.form.getRawValue().gender
      }
      this.store.dispatch(register({ userData: data as registerDTO}))
    }else{
      let messages = [];
      
      this.store.dispatch(registerFailed({ messages: ["all input fields must contain data"] }));
    }
  }
}