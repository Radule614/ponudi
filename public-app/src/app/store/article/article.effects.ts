import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, tap, map, of, switchMap } from "rxjs";
import { ArticleService } from "src/app/services/article.service";
import { AppState } from "..";
import * as ArticleActions from './article.actions';
import * as GeneralActions from '../general/general.actions';

@Injectable()
export class ArticleEffects {
  fetchAll = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.fetchAll),
    switchMap(action => {
      return this.articleService.fetchArticles(action.id, action.page, action.filterParams).pipe(
        map(data => {
          this.store.dispatch(ArticleActions.deactivateLoading());
          return ArticleActions.setAll({articles: data.data, page: action.page, count: data.count});
        }),
        catchError(error => {
          console.log(error.error.message);
          this.store.dispatch(ArticleActions.deactivateLoading());
          return of(ArticleActions.fetchFailed());
        })
      )
    })
  ));
  fetchAllByUser = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.fetchAllByUser),
    switchMap(action => {
      return this.articleService.fetchUserArticles(action.userId, action.page).pipe(
        map(data => {
          this.store.dispatch(ArticleActions.deactivateLoading());
          return ArticleActions.setAll({articles: data.data, page: action.page, count: data.count});
        }),
        catchError(error => {
          console.log(error.error.message);
          this.store.dispatch(ArticleActions.deactivateLoading());
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
          this.store.dispatch(ArticleActions.deactivateLoading());
          return ArticleActions.setArticle({article: data});
        }),
        catchError(error => {
          console.log(error.error.message);
          this.store.dispatch(ArticleActions.deactivateLoading());
          return of(ArticleActions.fetchFailed());
        })
      )
    })
  ));

  createArticle = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.createArticle),
    switchMap(action => {
      return this.articleService.postArticle(action.article).pipe(
        map(_ => {
          return ArticleActions.articleSuccess();
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.articleError({ messages: error.error.message }));
        })
      )
    })
  ));

  editArticle = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.editArticle),
    switchMap(action => {
      return this.articleService.patchArticle(action.id, action.article).pipe(
        map(_ => {
          return ArticleActions.articleSuccess();
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.articleError({ messages: error.error.message }));
        })
      )
    })
  ));

  deleteArticle = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.deleteArticle),
    switchMap(action => {
      return this.articleService.deleteArticle(action.id).pipe(
        map(_ => {
          return ArticleActions.deleteSuccess({ id: action.id, userId: action.userId });
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.articleError({ messages: error.error.message }));
        })
      )
    })
  ));

  articleSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.articleSuccess),
    tap(_ => {
      this.store.dispatch(GeneralActions.deactivateLoading());
      this.router.navigate(['/dashboard']);
    })
  ), { dispatch: false });

  deleteSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.deleteSuccess),
    switchMap(action => { 
      this.store.dispatch(GeneralActions.deactivateLoading());
      return of(ArticleActions.fetchAllByUser({ userId: action.userId, page: this.route.snapshot.queryParams['page'] }));
     })
  ));

  constructor(private actions$: Actions, 
              private articleService: ArticleService, 
              private router: Router, 
              private store: Store<AppState>,
              private route: ActivatedRoute){}
}