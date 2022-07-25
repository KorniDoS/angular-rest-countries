import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {

  changeTheme?: boolean;
  countriesData: any;


  searchTerm: string = '';



  countryDataSub?:Subscription;

  constructor(private countryService: CountryService) { }


  ngOnInit(): void {
    this.countryDataSub = this.countryService.getAllCountries().subscribe(
      res=>{
        this.countriesData = res;
        console.dir(this.countriesData);
      }
    )



    if(window.localStorage.getItem('toggledTheme')){
      this.changeTheme = true;
    }


  }


  themeHandler(event: boolean){
    this.changeTheme = event;
  }

  ngOnDestroy(): void {
      this.countryDataSub?.unsubscribe();
  }

  search(value: string): void {
    this.countriesData.filter((val:any) =>
      val?.name?.common?.toLowerCase().includes(value));
      console.log('Trying to search');
  }

}
