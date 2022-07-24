import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Article } from "../model/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  fetchArticles(id: string): Observable<any>{

    const mockData: Article[] = [
      { title: 'article_00', cost: 200 },
      { title: 'article_01', cost: 300 },
      { title: 'article_02', cost: 400 },
      { title: 'article_03', cost: 600 },
      { title: 'article_04', cost: 100 },
      { title: 'article_05', cost: 700 },
      { title: 'article_06', cost: 200 },
      { title: 'article_07', cost: 600 },
      { title: 'article_08', cost: 300 },
    ];

    return of(mockData);
  }
}