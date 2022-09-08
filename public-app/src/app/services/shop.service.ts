import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Shop } from "../model/shop.model";


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private http: HttpClient) { }  

  fetchShops(page: number): Observable<any> {
    if (!page || page <= 0) page = 1;
    let httpParams = new HttpParams().append('page', page);
    return this.http.get(`${environment.apiUrl}/shops`, { params: httpParams });
  }

  postShop(shop: Shop): Observable<any> {
    console.log(shop);
    return this.http.post(`${environment.apiUrl}/shops`, {...shop, adress: shop.address});
  }

  patchShop(id: string, shop: Shop) {
    return this.http.patch(`${environment.apiUrl}/shops/${id}`, shop);
  }
}