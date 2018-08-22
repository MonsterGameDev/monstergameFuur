import { Injectable } from '@angular/core';
import { Armor, ArmorTypeEnum, HttpErrorTracker } from '../+state/admin.interfaces';
import { HttpClient, HttpHeaders, HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'http://localhost:3000/armor';

  constructor(private _http: HttpClient) { }

  initializeArmor(): Armor {
    return {
      id: 0,
      armorName: null,
      armorLevel: null,
      armorType: null,
      armorStats: {
        health: null,
        power: null,
        defense: null
      }
    };
  }

  getAllArmor(): Observable<Armor[] | HttpErrorTracker> {
    const url = this.baseUrl + '/error/500';
    return this._http.get<Armor[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  getArmorPiece(id: Number): Observable<Armor>  {
    if (Number(id) === 0) {
      return of(this.initializeArmor());
    }

    const url = `${this.baseUrl}/${id}`;
    return this._http.get<Armor>(url);
  }

  createArmor(armor: Armor): Observable<Armor> {
    const httpHeaders: HttpHeaders =  new HttpHeaders({'Content-Type':  'application/json'});
    const options: object = {headers: httpHeaders};
    const url: string = this.baseUrl;

    return this._http.post<Armor>(url, armor, options);
  }

  updateArmor(armor: Armor): Observable<void> {
    const httpHeaders: HttpHeaders =  new HttpHeaders({'Content-Type':  'application/json'});
    const options: object = {headers: httpHeaders};
    const url = `${this.baseUrl}/${armor.id}`;

    return this._http.put<void>(url, armor, options).pipe(map(() => console.log('DataService: Armor updated')));
  }

  deleteArmor(id: Number): Observable<void> {
    // no httpHeaders needed in delete
    const url = `${this.baseUrl}/${id}`;
    return this._http.delete<void>(url);
  }

  // Error handling:
  handleHttpError(error: HttpErrorResponse): Observable<HttpErrorTracker> {
    const dataError: HttpErrorTracker = {
      errorNumber: 100,
      message: error.statusText,
      friendlymessage: 'An error occurred retrieving data from the server'
    };

    return of(dataError);
    // return throwError(dataError);
  }
}
