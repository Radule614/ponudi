import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient){}

  fetchCategories(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/categories/populated`);
  }
}