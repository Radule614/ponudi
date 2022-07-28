import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { AdminMainComponent } from './pages/admin/admin-main/admin-main.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CategoryCrudComponent } from './pages/admin/category-crud/category-crud.component';
import { ArticleComponent } from './pages/article/article.component';
import { CategoryComponent } from './pages/category/category.component';
import { ArticleCrudComponent } from './pages/dashboard/article-crud/article-crud.component';
import { DashboardMainComponent } from './pages/dashboard/dashboard-main/dashboard-main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShopsComponent } from './pages/shops/shops.component';

const routes: Routes = [
  { path: 'admin',          component: AdminComponent,        data: { nav: { value: 'administrator',    icon: 'user-gear',  logged: true, divider: true } }, canActivate: [AuthGuard], children: [
    { path: '',             component: AdminMainComponent                       },
    { path: 'category',     component: CategoryCrudComponent                    },
  ] },
  { path: 'dashboard',      component: DashboardComponent,    data: { nav: { value: 'kontrolna tabla',  icon: 'clipboard',  logged: true                } }, canActivate: [AuthGuard], children: [
    { path: '',             component: DashboardMainComponent                   },
    { path: 'article',      component: ArticleCrudComponent                     },
  ] },
  { path: 'account',        component: AccountComponent,      data: { nav: { value: 'korisnički nalog', icon: 'user',       logged: true, divider: true } }, canActivate: [AuthGuard] },
  { path: 'home',           component: HomeComponent,         data: { nav: { value: 'početna',          icon: 'house'                                   } } },
  { path: 'explore',        component: ExploreComponent,      data: { nav: { value: 'popularno',        icon: 'eye'                                     } } },
  { path: 'shops',          component: ShopsComponent,        data: { nav: { value: 'shopovi',          icon: 'shop',       divider: true               } } },
  { path: 'category/:id',   component: CategoryComponent                        },
  { path: 'article/:id',    component: ArticleComponent                         },
  { path: 'not-found',      component: PageNotFoundComponent                    },
  { path: '',               redirectTo: '/home',              pathMatch: 'full' },
  { path: '**',             redirectTo: '/not-found'                            }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
