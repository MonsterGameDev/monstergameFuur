import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogResponseInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   console.log(`LogResponseInterceptorService: ${req.url}`);

   return next.handle(req)
    .pipe(
      tap(e  => {
        if (e.type === HttpEventType.Response) {
          console.log(e.body);
        }
      })
    );
  }

  constructor() { }
}
