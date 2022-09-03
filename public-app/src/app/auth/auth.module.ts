import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SharedModule } from "../shared/shared.module";
import { SharedFormsModule } from "../shared/shared-forms.module";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    SharedFormsModule,
    SharedModule
  ]
})
export class AuthModule {}