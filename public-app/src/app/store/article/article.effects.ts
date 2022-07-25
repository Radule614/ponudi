import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ArticleService } from "src/app/services/article.service";
import * as ArticleActions from './article.actions';

@Injectable()
export class ArticleEffects {
  fetchAll = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.fetchAll),
    switchMap(action => {
      return this.articleService.fetchArticles(action.id).pipe(
        map(data => {
          return ArticleActions.setAll({articles: data});
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.fetchFailed());
        })
      )
    })
  ));
  fetchAllByUser = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.fetchAllByUser),
    switchMap(_ => {
      return this.articleService.fetchUserArticles().pipe(
        map(data => {
          return ArticleActions.setAll({articles: data});
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.fetchFailed());
        })
      )
    })
  ));
  fetchArticle = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.fetchArticle),
    switchMap(action => {
      return this.articleService.fetchArticleData(action.id).pipe(
        map(data => {
          return ArticleActions.setArticle({article: data});
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.fetchFailed());
        })
      )
    })
  ));

  constructor(private actions$: Actions, private articleService: ArticleService){}
}