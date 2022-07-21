import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

export interface Category {
  name:   string;
  path:   string;
  icon?:  any;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navRoutes: Route[];
  categoryList: Category[] = [
    { name: 'vozila',       path: 'category/vozila',      icon: 'car' },
    { name: 'nekretnine',   path: 'category/nekretnine',  icon: 'building' },
    { name: 'računari',     path: 'category/racunari',    icon: 'computer' },
    { name: 'saksije',      path: 'category/saksije',     icon: 'box-archive' },
    { name: 'ostalo',       path: 'category/ostalo',      icon: 'box-open' }
  ];

  constructor(private router: Router) {
    let mainRoute = this.router.config.filter(route => route.path == '')[0];
    this.navRoutes = mainRoute.children!.filter(route => route.data && route.data['nav']);
  }

  ngOnInit(): void {}

}
