import { Component, OnInit } from '@angular/core';
import * as ShopSelectors from 'src/app/store/shop/shop.selectors';
import * as GeneralSelectors from 'src/app/store/general/general.selectors';
import * as FromShop from 'src/app/store/shop/shop.actions';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable, switchMap, map, tap, combineLatest } from 'rxjs';
import { animate, group, query, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  animations: [
    trigger('expandBlock', [
      transition(':enter', [
        style({ height: 0}),
        animate('250ms ease-out', style({ height: '*' })),
      ]),
      transition(':leave', [
        style({ height: '*'}),
        group([
          animate('250ms ease-out', style({ height: 0 })),
          query('.inner', [
            style({ opacity: 1}),
            animate(200, style({ opacity: 0 })),
          ])
        ])
      ])
    ]),
    trigger('expandButton', [
      state('true',   style({ transform: 'rotateZ(-90deg)' })),
      state('false',  style({ transform: 'rotateZ(0deg)' })),
      transition('true <=> false', animate('250ms ease-out'))
    ])
  ]
})
export class ShopsComponent implements OnInit {
  page: number = -1;
  filtersExpanded: boolean = false;

  menuOpen$: Observable<boolean> = this.store.select(GeneralSelectors.selectMenuOpen);
  shopParams$: Observable<any> = this.route.queryParams.pipe(
    tap(qp => {
      this.page = qp['page'];
      const filterParams = Object.assign({}, qp);
      delete filterParams['page'];

      this.store.dispatch(FromShop.activateLoading());
      this.store.dispatch(FromShop.fetchAll({ page: this.page, filterParams }));
    })
  );
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }
  ngOnInit(): void {}
}