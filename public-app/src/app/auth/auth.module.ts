import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule
  ]
})
export class AuthModule {}