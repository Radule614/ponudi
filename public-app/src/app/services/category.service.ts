import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "../model/category.model";
import { AppState } from "../store";


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

  calculateCategoryPath(array: Category[], id: string): Category[] {
    for(let cat of array){
      if(cat.id == id){
        return [cat];
      }
      let ret = this.calculateCategoryPath(cat.children, id);
      if(ret.length != 0){
        ret.unshift(cat)
        return ret;
      }
    }
    return [];
  }
}