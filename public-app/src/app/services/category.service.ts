import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, map, Observable, take } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "../model/category.model";
import { AppState } from "../store";
import * as CategorySelectors from "src/app/store/category/category.selectors";
import * as ArticleSelectors from "src/app/store/article/article.selectors";


export interface CategoryDTO {
  name: string;
  parent: string | null;
  children: Category[];
  icon?: any;
  additionalFields?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  fetchCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/categories/populated`);
  }

  createCategory(data: CategoryDTO): Observable<any> {
    return this.http.post(`${environment.apiUrl}/categories`, data);
  }

  getCurrentCategoryPath(): Observable<Category[]> {
    return combineLatest([this.store.select(CategorySelectors.selectAll), this.store.select(ArticleSelectors.selectArticle)]).pipe(map(([categories, article]) => {
      return this.getCategoryPath(categories, article?.category);
    }));
  }

  getCategoryPath(array: Category[], id:string | undefined | null): Category[] {
    if(!id) return[];
    for(let cat of array){
      if(cat.id == id){
        return [cat];
      }
      let ret = this.getCategoryPath(cat.children, id);
      if(ret.length != 0){
        ret.unshift(cat)
        return ret;
      }
    }
    return [];
  }
}