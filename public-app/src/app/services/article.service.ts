import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Article } from "../model/article.model";



@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  fetchArticles(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products/category/${id}`);
  }

  fetchUserArticles(): Observable<any> {
    
    const mockData: Article[] = [
      { content: 'user_article_00', price: 200 },
      { content: 'user_article_01', price: 300 },
      { content: 'user_article_02', price: 400 },
      { content: 'user_article_03', price: 600 }
    ];

    return of(mockData);
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