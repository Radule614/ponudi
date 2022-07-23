import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient){}

  fetchCategories(): Observable<any>{
    return this.http.get('http://localhost:8000/categories/populated');
  }
}