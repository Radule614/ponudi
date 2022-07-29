import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "../model/category.model";

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
  constructor(private http: HttpClient) {}

  fetchCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/categories/populated`);
  }

  createCategory(data: CategoryDTO): Observable<any> {
    return this.http.post(`${environment.apiUrl}/categories`, data);
  }
}