import { Component, OnInit } from '@angular/core';
import * as ShopSelectors from 'src/app/store/shop/shop.selectors';
import * as FromShop from 'src/app/store/shop/shop.actions';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable, switchMap, map, tap } from 'rxjs';
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
  menuOpen: boolean = true;

  
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }
  ngOnInit(): void {}
}