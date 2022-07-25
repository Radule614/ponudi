import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/account/account.component';
import { CategoryComponent } from './pages/category/category.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ArticleComponent } from './pages/article/article.component';
import { CrudComponent } from './pages/crud/crud.component';
import { ArticleCrudComponent } from './pages/crud/article-crud/article-crud.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: 
    [
      { path: 'dashboard',      component: DashboardComponent,    data: { nav: { value: 'kontrolna tabla',  icon: 'clipboard'               } }, canActivate: [AuthGuard] },
      { path: 'account',        component: AccountComponent,      data: { nav: { value: 'korisnički nalog', icon: 'user',     divider: true } }, canActivate: [AuthGuard] },
      { path: 'home',           component: HomeComponent,         data: { nav: { value: 'početna',          icon: 'house'                   } } },
      { path: 'explore',        component: ExploreComponent,      data: { nav: { value: 'popularno',        icon: 'eye'                     } } },
      { path: 'shops',          component: ShopsComponent,        data: { nav: { value: 'shopovi',          icon: 'shop',     divider: true } } },
      { path: 'category/:id',   component: CategoryComponent                                                                                    },
      { path: 'article/:id',    component: ArticleComponent                                                                                     },
      { path: 'crud',           component: CrudComponent,         canActivate: [AuthGuard], children: [
        { path: 'article',      component: ArticleCrudComponent                     },
        { path: '',             redirectTo: '/not-found',         pathMatch: 'full' }  
      ]},
      { path: 'not-found',      component: PageNotFoundComponent                                                                                },
      { path: '',               redirectTo: '/home',              pathMatch: 'full'                                                             },
      { path: '**',             redirectTo: '/not-found'                                                                                        }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
