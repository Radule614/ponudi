import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, tap, map, of, switchMap, forkJoin, finalize } from "rxjs";
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
          return ArticleActions.setAll({ articles: data.data, page: action.page, count: data.count });
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.fetchFailed());
        }),
        finalize(() => this.store.dispatch(ArticleActions.deactivateLoading()))
      )
    })
  ));
  fetchAllByUser = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.fetchAllByUser),
    switchMap(action => {
      return this.articleService.fetchUserArticles(action.userId, action.page).pipe(
        map(data => {
          this.store.dispatch(ArticleActions.deactivateLoading());
          return ArticleActions.setAll({ articles: data.data, page: action.page, count: data.count });
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
          return ArticleActions.setArticle({ article: data });
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.fetchFailed());
        }),
        finalize(() => this.store.dispatch(ArticleActions.deactivateLoading()))
      )
    })
  ));

  createArticle = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.createArticle),
    switchMap(action => {
      return this.articleService.postArticle(action.article).pipe(
        map(response => {
          if (action.images) {
            return ArticleActions.putImages({ id: response['_id'], images: action.images });
          }
          return ArticleActions.articleSuccess();
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.articleError({ messages: [error.error.message] }));
        })
      )
    })
  ));

  editArticle = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.editArticle),
    switchMap(action => {
      return this.articleService.patchArticle(action.id, action.article).pipe(
        map(_ => {
          if (action.images || action.imagesToDelete) {
            return ArticleActions.updateImages({ id: action.id, images: action.images, imagesToDelete: action.imagesToDelete });
          }
          return ArticleActions.articleSuccess();
        }),
        catchError(error => {
          console.log(error.error.message);
          return of(ArticleActions.articleError({ messages: [error.error.message] }));
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

  articleError$ = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.articleError),
    tap(_ => {
      this.store.dispatch(GeneralActions.deactivateLoading());
    })
  ), { dispatch: false });

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

  putImages$ = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.putImages),
    switchMap(action => {
      return this.articleService.putImages(action.id, action.images).pipe(
        map(_ => {
          return ArticleActions.articleSuccess();
        }),
        catchError(error => {
          console.log(error);
          return of(GeneralActions.deactivateLoading());
        })
      )
    })
  ));

  updateImages$ = createEffect(() => this.actions$.pipe(
    ofType(ArticleActions.updateImages),
    switchMap(action => {
      const appendImages$ = this.articleService.appendImages(action.id, action.images);
      const deleteImages$ = this.articleService.deleteImages(action.id, action.imagesToDelete);
      return forkJoin([deleteImages$, appendImages$]).pipe(
        map(([_, __]) => {
          return ArticleActions.articleSuccess();
        }),
        catchError(error => {
          console.log(error);
          return of(GeneralActions.deactivateLoading());
        })
      );
    })
  ));

  constructor(private actions$: Actions,
    private articleService: ArticleService,
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute) { }
}