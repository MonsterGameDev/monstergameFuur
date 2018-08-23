import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddHeaderInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(`AddHeaderInterceptor: ${req.url}`);

      const jsonRequest = req.clone({
        setHeaders: {'Content-Type': 'application/json'}
      });

    return next.handle(jsonRequest);
   }

  constructor() { }
}
