import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Article } from "src/app/model/article.model";
import { AppState } from "src/app/store";
import * as ArticleSelectors from '../../../store/article/article.selectors';
import * as FromArticle from '../../../store/article/article.actions';
import { animate, group, query, state, style, transition, trigger } from "@angular/animations";

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
export class CategoryComponent implements OnInit, OnDestroy {
  categoryId: string = "";
  subs: Subscription[] = [];

  articles: Article[] = [];
  filtersExpanded: boolean = false;

  constructor(private route: ActivatedRoute, private store: Store<AppState>){}

  ngOnInit(): void {
    let sub = this.route.params.subscribe(data => {
      this.categoryId = data['id'];
      this.store.dispatch(FromArticle.fetchAll({ id: this.categoryId }))
    })
    this.subs.push(sub);
    
    sub = this.store.select(ArticleSelectors.selectAll).subscribe(data => {
      this.articles = data;
    })
    this.subs.push(sub);
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => { sub.unsubscribe() });
  }
}