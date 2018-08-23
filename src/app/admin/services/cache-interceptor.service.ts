import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Pass aling non-cachable requests and invalidate cache
    if ( req.method !== 'GET') {
     console.log(`Invalidating the Cache ${req.method} ${req.url}`);
     this.cache.invalidateCache();
      next.handle(req);
    }

    // attempt to retreive a cached response
    const cachedResponse: HttpResponse<any> = this.cache.get(req.url);

    // return cached response
    if (cachedResponse) {
      console.log(`Returning cached response ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    // send request to server and cache response
    return next.handle(req)
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(`Adding item to cache`);
          this.cache.put(req.url, event);
        }
      })
    );
  }

  constructor(private cache: CacheService) { }
}
