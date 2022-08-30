import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Article } from "../model/article.model";
import { Image } from "../model/image.model";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  fetchArticles(id: string, page: number, filterParams?: Object): Observable<any> {
    if (!page || page <= 0) page = 1;

    let httpParams = new HttpParams().append('page', page);
    if (filterParams) {
      for (let param in filterParams) {
        httpParams = httpParams.append(param, filterParams[param]);
      }
    }

    return this.http.get(`${environment.apiUrl}/products/category/${id}`, {
      params: httpParams
    });
  }

  fetchUserArticles(userId: string, page: number): Observable<any> {
    if (!page || page <= 0) page = 1;
    return this.http.get(`${environment.apiUrl}/products/user/${userId}`, {
      params: new HttpParams().append('page', page)
    });
  }

  fetchArticleData(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }

  postArticle(article: Article) {
    return this.http.post(`${environment.apiUrl}/products`, article);
  }

  patchArticle(id: string, article: Article) {
    return this.http.patch(`${environment.apiUrl}/products/${id}`, article);
  }

  deleteArticle(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }

  putImages(id: string, images: File[]) {
    const formData = new FormData();
    for (let image of images) {
      formData.append('files', image);
    }
    return this.http.put(`${environment.apiUrl}/products/${id}`, formData);
  }

  appendImages(id: string, images?: File[]) {
    console.log(images);
    if (images) {
      const formData = new FormData();
      for (let image of images) {
        formData.append('files', image);
      }
      return this.http.put(`${environment.apiUrl}/products/pictures/${id}`, formData);
    } else {
      return of(0);
    }
  }

  deleteImages(id: string, images?: Image[]) {
    console.log(images);
    if (images) {
      return this.http.delete(`${environment.apiUrl}/products/pictures/${id}`, {
        body: { images: images.map(im => im.url) }
      });
    } else {
      return of(0);
    }
  }
}