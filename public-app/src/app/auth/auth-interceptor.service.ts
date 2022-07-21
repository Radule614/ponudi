import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, Observable, take } from "rxjs";
import { AppState } from "../store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      exhaustMap(state => {
        if(state.token != null){
          const modifiedReq = req.clone({
            setHeaders: { Authorization: `Bearer ${state.token}` }
          })
          return next.handle(modifiedReq);
        }
        return next.handle(req);
      })
    );
  }
}