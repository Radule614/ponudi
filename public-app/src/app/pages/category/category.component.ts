import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store";
import * as FromArticle from 'src/app/store/article/article.actions';
import { animate, group, query, state, style, transition, trigger } from "@angular/animations";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";
import { combineLatest } from "rxjs";
import * as GeneralSelectors from 'src/app/store/general/general.selectors';
import * as CategorySelectors from 'src/app/store/category/category.selectors';
import { NavigationService } from "src/app/main/navigation/navigation.service";
import { CategoryService } from "src/app/services/category.service";
import { AdditionalField } from "src/app/model/article.model";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
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
export class CategoryComponent extends UnsubscribeComponent implements OnInit {
  categoryId: string = "";
  page: number = -1;
  filtersExpanded: boolean = false;
  menuOpen: boolean = true;
  additionalFields: AdditionalField[] = [];

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private navigationService: NavigationService, private categoryService: CategoryService){ super() }

  ngOnInit(): void {
    this.addToSubs = combineLatest([this.route.params, this.route.queryParams, this.store.select(CategorySelectors.selectAll)]).subscribe(([params, queryParams, categories]) => {
      this.categoryId = params['id'];
      this.page =       queryParams['page'];
      this.store.dispatch(FromArticle.activateLoading());
      this.store.dispatch(FromArticle.fetchAll({ id: this.categoryId, page: this.page }));
      this.navigationService.activeCategory$.next(this.categoryId);
      this.additionalFields = this.categoryService.getAllAdditionalFields(categories, this.categoryId);

    });
    this.store.select(GeneralSelectors.selectMenuOpen).subscribe(menuOpen => { this.menuOpen = menuOpen })
  }
}