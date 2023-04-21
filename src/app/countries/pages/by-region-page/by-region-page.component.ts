import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  public regions: string[] = ['asia', 'america', 'africa', 'europe', 'oceania'];
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  buscarPaisPorRegion(region: string): void {
    this.countriesService
      .searchRegion(region)
      .subscribe((countries) => (this.countries = countries));
  }
}
