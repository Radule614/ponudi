import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../shared-styles.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit{
  form: UntypedFormGroup;

  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      'username':         new UntypedFormControl(null, [Validators.required]),
      'email':            new UntypedFormControl(null, [Validators.required, Validators.email]),
      'password':         new UntypedFormControl(null, [Validators.required]),
      'passwordConfirm':  new UntypedFormControl(null, [Validators.required]),
      'gender':           new UntypedFormControl(null, [Validators.required])
    });
  }
  
  onSubmit(){
    console.log(this.form);
    this.http.post('http://localhost:8000/auth/register', 
      {
        username: this.form.getRawValue().username,
        email: this.form.getRawValue().email,
        password: this.form.getRawValue().password,
        name: "1",
        surname: "2"
      }
    ).subscribe(data => {
      console.log(data);
    });
  }
}