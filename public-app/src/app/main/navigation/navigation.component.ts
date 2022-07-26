import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store';
import * as CategorySelectors from 'src/app/store/category/category.selectors';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./shared-styles.scss', './navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navRoutes: Route[];
  categoryList: Category[];
  subs: Subscription[] = [];

  constructor(private router: Router, private store: Store<AppState>) {
    let mainRoute = this.router.config.filter(route => route.path == '')[0];
    this.navRoutes = mainRoute.children!.filter(route => route.data && route.data['nav']);
  }

  ngOnInit(): void {
    let sub = this.store.select(CategorySelectors.selectAll).subscribe(data => {
      this.categoryList = data;
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }

}
