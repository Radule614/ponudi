import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { MainModule } from "src/app/main/main.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ArticleCrudComponent } from "./article-crud/article-crud.component";
import { DashboardMainComponent } from "./dashboard-main/dashboard-main.component";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardMainComponent,
    ArticleCrudComponent
  ],
  imports: [
    MainModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class DashboardModule {}