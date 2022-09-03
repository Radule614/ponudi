import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { AdminComponent } from "./admin.component";
import { CategoryCrudComponent } from "./category-crud/category-crud.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { 
        path: '',     
        component: AdminMainComponent
      },
      { 
        path: 'category',
        component: CategoryCrudComponent 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }