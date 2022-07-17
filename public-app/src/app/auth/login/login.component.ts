import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared-styles.scss', './login.component.scss']
})
export class LoginComponent implements OnInit{
  form: FormGroup;

  constructor(){}

  ngOnInit(): void {
    this.form = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }
  
  onSubmit(){
    console.log(this.form);
  }
}