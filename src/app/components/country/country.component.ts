import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private countryService: CountryService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  singleCountryData?: any;
  singleCountryDataSub?: Subscription;

  neighbourCountriesSub?: Subscription;

  firstLanguage?: any;
  currency?: any;
  languages?: any;
  borderCountries?: any;

  borderCountriesData?: any[] = [];

  changeTheme: boolean = false;

  themeHandler(event: boolean) {
    this.changeTheme = event;
  }

  ngAfterViewInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

  }

  ngOnInit(): void {
    

    if (window.localStorage.getItem('toggledTheme')) {
      this.changeTheme = true;
    }

    this.route.paramMap.subscribe(
      params => {
        const code = params.get('code');

        if (code) {
          this.singleCountryDataSub = this.countryService.getCountryByCode(code).subscribe(
            res => {
              this.singleCountryData = res;


              this.firstLanguage = Object.keys(this.singleCountryData[0].languages)[0];
              this.currency = Object.entries(this.singleCountryData[0].currencies)[0];
              this.languages = Object.entries(this.singleCountryData[0].languages);

              this.borderCountries = this.singleCountryData[0].borders;


              this.neighbourCountriesSub = this.countryService?.getNeighboursByCode(this.borderCountries).subscribe(
                resp => {
                  this.borderCountriesData = resp;
                }
              )

            }
          )
        }

      }
    )



  }



  ngOnDestroy(): void {
    this.singleCountryDataSub?.unsubscribe();
    this.neighbourCountriesSub?.unsubscribe();
  }

}
