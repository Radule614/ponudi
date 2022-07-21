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

const routes: Routes = [
  { path: '', component: MainComponent, children: 
    [
      { path: 'dashboard',      component: DashboardComponent,    data: { nav: { value: 'kontrolna tabla',  icon: 'clipboard'               } } },
      { path: 'account',        component: AccountComponent,      data: { nav: { value: 'korisnički nalog', icon: 'user',     divider: true } } },
      { path: 'home',           component: HomeComponent,         data: { nav: { value: 'početna',          icon: 'house'                   } } },
      { path: 'explore',        component: ExploreComponent,      data: { nav: { value: 'popularno',        icon: 'eye'                     } } },
      { path: 'shops',          component: ShopsComponent,        data: { nav: { value: 'shopovi',          icon: 'shop',     divider: true } } },
      { path: 'category/:name', component: CategoryComponent                                                                                    },
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
