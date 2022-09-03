import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleCrudComponent } from "./article-crud/article-crud.component";
import { ArticleEditGuard } from "./article-crud/article-edit.guard";
import { DashboardMainComponent } from "./dashboard-main/dashboard-main.component";
import { UserArticlesComponent } from "./dashboard-main/user-articles/user-articles.component";
import { UserShopsComponent } from "./dashboard-main/user-shops/user-shops.component";
import { DashboardComponent } from "./dashboard.component";
import { ShopCrudComponent } from "./shop-crud/shop-crud.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { 
        path: '',
        component: DashboardMainComponent,
        children: [
          {
            path: 'articles',
            component: UserArticlesComponent
          },
          {
            path: 'shops',
            component: UserShopsComponent
          },
          {
            path: '',
            redirectTo: 'articles',
            pathMatch: 'full' 
          }
        ]
      },
      { 
        path: 'article/add',
        component: ArticleCrudComponent
      },
      { 
        path: 'article/edit/:id',
        component: ArticleCrudComponent,
        canActivate: [ArticleEditGuard]
      },
      {
        path: 'shop/add',
        component: ShopCrudComponent
      },
      { 
        path: 'shop/edit/:id',
        component: ShopCrudComponent //setup edit guard similar to article edit guard
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }