import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
      { path: 'home',       component: HomeComponent,           data: { nav: { value: 'početna',    icon: 'house' } } },
      { path: 'explore',    component: ExploreComponent,        data: { nav: { value: 'popularno',  icon: 'eye' } } },
      { path: 'shops',      component: ShopsComponent,          data: { nav: { value: 'shopovi',    icon: 'shop' } } },
      { path: 'not-found',  component: PageNotFoundComponent },
      { path: '',           redirectTo: '/home', pathMatch: 'full'},
      { path: '**',         redirectTo: '/not-found' }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
