import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _apiURl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this._apiURl}/capital/${term}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([]))); // Retorna un nuevo observable de un array vacío
  }

  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this._apiURl}/name/${term}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }

  searchRegion(region: string): Observable<Country[]> {
    const url: string = `${this._apiURl}/region/${region}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }
}
