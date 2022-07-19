import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared-styles.scss', './login.component.scss']
})
export class LoginComponent implements OnInit{
  form: UntypedFormGroup;

  constructor(){}

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      'username': new UntypedFormControl(null, Validators.required),
      'password': new UntypedFormControl(null, Validators.required)
    });
  }
  
  onSubmit(){
    console.log(this.form);
  }
}