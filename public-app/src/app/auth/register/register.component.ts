import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../shared-styles.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit{
  form: FormGroup;

  constructor(){}
  
  ngOnInit(): void {
    this.form = new FormGroup({
      'username':         new FormControl(null, [Validators.required]),
      'email':            new FormControl(null, [Validators.required, Validators.email]),
      'password':         new FormControl(null, [Validators.required]),
      'passwordConfirm':  new FormControl(null, [Validators.required])
    });
  }
  
  onSubmit(){
    console.log(this.form);
  }
}