import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, canActivate: [UnauthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }