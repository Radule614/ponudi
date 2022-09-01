import { Component, OnInit } from "@angular/core";
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { AppState } from "src/app/store";
import * as fromAuth from "src/app/store/auth/auth.actions";
import { registerDTO } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../shared-styles.scss', './register.component.scss']
})
export class RegisterComponent extends UnsubscribeComponent implements OnInit{
  form: UntypedFormGroup;
  errorMessages: string[] = [];
  loading: boolean = false;

  constructor(private store: Store<AppState>){ super() }
  
  ngOnInit(): void {
    this.store.dispatch(fromAuth.registerClear())
    this.addToSubs = this.store.select('auth').subscribe(state => {
      this.loading = state.loading;
      this.errorMessages = state.registerErrors;
    });
    this.form = new UntypedFormGroup({
      'username':         new UntypedFormControl(null, [Validators.required, Validators.maxLength(20)]),
      'email':            new UntypedFormControl(null, [Validators.required, Validators.email]),
      'firstname':        new UntypedFormControl(null, [Validators.required]),
      'lastname':         new UntypedFormControl(null, [Validators.required]),
      'password':         new UntypedFormControl(null, [Validators.required]),
      'passwordConfirm':  new UntypedFormControl(null, [Validators.required]),
      'gender':           new UntypedFormControl(null, [Validators.required]),
    }, [RegisterComponent.MatchValidator('password', 'passwordConfirm')]);
  }
  
  onSubmit(){
    if(this.form.status == 'VALID'){
      this.store.dispatch(fromAuth.setLoading({loading: true}));
      let data = {
        username: this.form.getRawValue().username,
        email: this.form.getRawValue().email,
        name: this.form.getRawValue().firstname,
        surname: this.form.getRawValue().lastname,
        password: this.form.getRawValue().password,
        gender: this.form.getRawValue().gender
      }
      this.store.dispatch(fromAuth.register({ userData: data as registerDTO}))
    }else{
      let messages: string[] = [];
      if(this.passwordMatchError) messages.push('password confirmation does not match');
      if(this.requiredError) messages.push('all input fields must contain data');
      if(this.emailError) messages.push('email is not valid');
      this.store.dispatch(fromAuth.registerFailed({ messages: messages }));
    }
  }

  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);
      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  get passwordMatchError() {
    return this.form.getError('mismatch');
  }

  get requiredError(){
    let controls = this.form.controls;
    for(let key in controls){
      if(controls[key].hasError('required')) return true;
    }
    return false;
  }
  get emailError(){
    return this.form.controls['email'].hasError('email');
  }
}