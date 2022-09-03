import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map, of, mergeMap, catchError, take } from "rxjs";
import { ArticleService } from "src/app/services/article.service";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store";
import { selectUser } from "src/app/store/auth/auth.selectors";
import * as FromGeneral from "src/app/store/general/general.actions";
import * as FromArticle from "src/app/store/article/article.actions";
import { User } from "src/app/model/user.model";
import { Article } from "src/app/model/article.model";
@Injectable({
  providedIn: 'root'
})
export class ArticleEditGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router, private authService: AuthService, private articleService: ArticleService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select(selectUser).pipe(mergeMap(user => {
      this.store.dispatch(FromGeneral.activateLoading());
      let articleId = route.params['id'];
      return this.articleService.fetchArticleData(articleId).pipe(
        take(1),
        mergeMap(articleData => {
          //if user object exists => check if article ownership matches
          if(user){
            return of(this.validityHandler(user, articleData));
          }
          //else => send request for object data then check ownership
          return this.authService.fetchUserData().pipe(
            map(userData => {
              return this.validityHandler(userData, articleData);
            }));
        }),
        catchError(_ => {
          this.store.dispatch(FromGeneral.deactivateLoading());
          return of(this.router.createUrlTree(['/not-found']));
        })
      );
    }));
  }

  validityHandler(user: User, article: Article): boolean | UrlTree {
    if(user._id == article.owner){
      this.store.dispatch(FromArticle.setArticle({ article: article }));
      this.store.dispatch(FromGeneral.deactivateLoading());
      return true;
    }else{
      this.store.dispatch(FromGeneral.deactivateLoading());
      return this.router.createUrlTree(['/not-found']);
    } 
  }

}