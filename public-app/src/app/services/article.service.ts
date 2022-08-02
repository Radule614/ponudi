import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, Observable, of, take } from "rxjs";
import { environment } from "src/environments/environment";
import { Article } from "../model/article.model";
import { AppState } from "../store";
import * as AuthSelectors from "src/app/store/auth/auth.selectors";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  fetchArticles(id: string, page: number): Observable<any> {
    if(!page || page <= 0) page = 1;
    return this.http.get(`${environment.apiUrl}/products/category/${id}`, {
      params: new HttpParams().set('page', page)
    });
  }

  fetchUserArticles(userId: string, page: number): Observable<any> {
    if(!page || page <= 0) page = 1;
    return this.http.get(`${environment.apiUrl}/products/user/${userId}`, {
      params: new HttpParams().set('page', page)
    });
  }

  fetchArticleData(id: string): Observable<any> {
    const mockData: Article = { 
      content: 'selected_article', 
      price: 200 
    };
    return of(mockData);
  }

  postArticle(article: Article){
    return this.http.post(`${environment.apiUrl}/products`, article);
  }
}