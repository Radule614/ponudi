import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import { AppState } from "src/app/store";
import * as ArticleSelectors from 'src/app/store/article/article.selectors';
import * as FromArticle from 'src/app/store/article/article.actions';
import { animate, group, query, state, style, transition, trigger } from "@angular/animations";
import { UnsubscribeComponent } from "src/app/shared/unsubscribe/unsubscribe.component";

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
  articles: Article[] = [];
  filtersExpanded: boolean = false;

  constructor(private route: ActivatedRoute, private store: Store<AppState>){ super() }

  ngOnInit(): void {
    this.addToSubs = this.route.params.subscribe(data => {
      this.categoryId = data['id'];
      this.store.dispatch(FromArticle.fetchAll({ id: this.categoryId }))
    })
    this.addToSubs = this.store.select(ArticleSelectors.selectAll).subscribe(data => {
      //console.log(data);
      this.articles = data;
    })
  }
}