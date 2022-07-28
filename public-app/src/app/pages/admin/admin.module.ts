import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainModule } from "src/app/main/main.module";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { AdminComponent } from "./admin.component";
import { CategoryCrudComponent } from "./category-crud/category-crud.component";

@NgModule({
  declarations: [
    AdminComponent,
    AdminMainComponent,
    CategoryCrudComponent
  ],
  imports: [
    MainModule,
    RouterModule
  ]
})
export class AdminModule {}