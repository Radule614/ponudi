import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MainModule } from "src/app/main/main.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { AdminComponent } from "./admin.component";
import { CategoryCrudComponent } from "./category-crud/category-crud.component";
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AdminComponent,
    AdminMainComponent,
    CategoryCrudComponent
  ],
  imports: [
    MainModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class AdminModule {}