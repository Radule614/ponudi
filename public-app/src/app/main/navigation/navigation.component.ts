import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./shared-styles.scss', './navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navRoutes: Route[];
  categoryList: Category[] = [
    { name: 'vozila',       path: 'category/vozila',      icon: 'car' ,     children: [
      { name: 'vozila_0',   path: 'category/vozila_0'   },
      { name: 'vozila_1',   path: 'category/vozila_1',    children: [
        { name: 'vozila_10', path: 'category/vozila_10' },
        { name: 'vozila_11', path: 'category/vozila_11' },
        { name: 'vozila_12', path: 'category/vozila_12' },
        { name: 'vozila_13', path: 'category/vozila_13' },
      ]},
      { name: 'vozila_2',   path: 'category/vozila_2'   }
    ]},
    { name: 'nekretnine',   path: 'category/nekretnine',  icon: 'building'    },
    { name: 'računari',     path: 'category/racunari',    icon: 'computer', children: [
      { name: 'racunari_0', path: 'category/racunari_0' },
      { name: 'racunari_1', path: 'category/racunari_1' }
    ]},
    { name: 'saksije',      path: 'category/saksije',     icon: 'box-archive' },
    { name: 'ostalo',       path: 'category/ostalo',      icon: 'box-open'    }
  ];

  constructor(private router: Router) {
    let mainRoute = this.router.config.filter(route => route.path == '')[0];
    this.navRoutes = mainRoute.children!.filter(route => route.data && route.data['nav']);
  }

  ngOnInit(): void {}

}
