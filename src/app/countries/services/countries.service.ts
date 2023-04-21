import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _apiURl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  // Reftiorización

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }

  // Fin refactorizacion

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url: string = `${this._apiURl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this._apiURl}/capital/${term}`;
    return this.getCountriesRequest(url); // Retorna un nuevo observable de un array vacío
  }

  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this._apiURl}/name/${term}`;
    return this.getCountriesRequest(url);
  }

  searchRegion(region: string): Observable<Country[]> {
    const url: string = `${this._apiURl}/region/${region}`;
    return this.getCountriesRequest(url);
  }
}
