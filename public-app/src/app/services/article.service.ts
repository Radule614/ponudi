import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Article } from "../model/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  fetchArticles(id: string): Observable<any> {

    // const mockData: Article[] = [
    //   { content: 'article_00', price: 200 },
    //   { content: 'article_01', price: 300 },
    //   { content: 'article_02', price: 400 },
    //   { content: 'article_03', price: 600 },
    //   { content: 'article_04', price: 100 },
    //   { content: 'article_05', price: 700 },
    //   { content: 'article_06', price: 200 },
    //   { content: 'article_07', price: 600 },
    //   { content: 'article_08', price: 300 },
    // ];

    return this.http.get(`http://localhost:8000/products/category/${id}`);
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
    return of();
  }
}