import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interace';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _apiURl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountries: {
      term: '',
      countries: [],
    },
    byRegion: {
      region: '',
      countries: [],
    },
  };

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

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
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries })),
      tap(() => this.saveToLocalStorage())
    ); // Retorna un nuevo observable de un array vacío
  }

  searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this._apiURl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url: string = `${this._apiURl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }
}
