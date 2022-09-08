import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { ArticleComponent } from './pages/article/article.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    data: {
      nav: {
        value: 'administrator',
        icon: 'user-gear',
        roles: ['admin'],
        divider: true
      }
    }, 
    canActivate: [AuthGuard],  
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      nav: {
        value: 'kontrolna tabla',
        icon: 'clipboard',
        roles: ['user']           
      }
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'account',  
    component: AccountComponent,
    data: {
      nav: {
        value: 'korisnički nalog',
        icon: 'user',
        roles: ['user'],
        divider: true
      } 
    }, canActivate: [AuthGuard]
  },
  { 
    path: 'home',
    component: HomeComponent,
    data: {
      nav: {
        value: 'početna',
        icon: 'house'
      }
    }
  },
  {
    path: 'explore',
    component: ExploreComponent,
    data: {
      nav: {
        value: 'popularno',
        icon: 'eye'
      }
    }
  },
  {
    path: 'shops',
    loadChildren: () => import('./pages/shops/shops.module').then(m => m.ShopsModule),
    data: {
      nav: {
        value: 'šopovi',
        icon: 'shop',
        divider: true
      }
    }
  },
  {
    path: 'shop/:id',
    loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'category/:id',
    loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'article/:id',
    component: ArticleComponent                  
  },
  { 
    path: 'email/verify',
    component: EmailVerificationComponent
  },
  { 
    path: 'not-found',
    component: PageNotFoundComponent
  },
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' 
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
