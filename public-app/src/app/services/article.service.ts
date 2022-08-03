import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Article } from "../model/article.model";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

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
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }

  postArticle(article: Article){
    return this.http.post(`${environment.apiUrl}/products`, article);
  }
}