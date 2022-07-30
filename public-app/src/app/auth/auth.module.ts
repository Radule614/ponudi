import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SharedModule } from "../shared/shared.module";
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    SharedModule,
    MatRadioModule
  ]
})
export class AuthModule {}