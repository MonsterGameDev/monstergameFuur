import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Armor, HttpErrorTracker } from '../+state/admin.interfaces';
import { DataService } from './data.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<Armor[] | HttpErrorTracker> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Armor[] | HttpErrorTracker> {
    return this.svc.getAllArmor()
      .pipe(
        catchError(err => of(err))
      );
  }

  constructor(private svc: DataService) { }
}
