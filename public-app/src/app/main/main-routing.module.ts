import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
      { path: 'home',       component: HomeComponent,           data: { nav: { value: 'home',       icon: 'house' } } },
      { path: 'explore',    component: ExploreComponent,        data: { nav: { value: 'explore',    icon: 'hashtag' } } },
      { path: 'bookmarks',  component: BookmarksComponent,      data: { nav: { value: 'bookmarks',  icon: 'bookmark' } } },
      { path: 'profile',    component: ProfileComponent,        data: { nav: { value: 'profile',    icon: 'user' } } },
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
