import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UnsubscribeComponent } from 'src/app/shared/unsubscribe/unsubscribe.component';
import { AppState } from 'src/app/store';
import * as CategorySelectors from 'src/app/store/category/category.selectors';
import * as AuthSelectors from 'src/app/store/auth/auth.selectors';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./shared-styles.scss', './navigation.component.scss']
})
export class NavigationComponent extends UnsubscribeComponent implements OnInit {
  navRoutes: Route[];
  categoryList: Category[];

  constructor(private router: Router, private store: Store<AppState>) { super() }

  ngOnInit(): void {
    this.addToSubs = this.store.select(AuthSelectors.selectUser).subscribe(user => {
      this.navRoutes = this.router.config!.filter(route => {
        if(route.data && route.data['nav']){
          let roles = route.data['nav']['roles'];
          if(roles != undefined) {
            if(user){
              for(let role of roles){
                if(user.roles?.includes(role)) return true;
              }
              return false;
            }
            return false;
          }
          return  true;
        }
        return false;
      });
    });
    this.addToSubs = this.store.select(CategorySelectors.selectAll).subscribe(data => {
      this.categoryList = data;
    });
  }

}
