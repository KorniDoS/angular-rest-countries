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
  countriesDataCopy: any;


  searchTerm: string = '';

  selectedRegion: any = 'none';

  filteredCountries: any[] = [];


  countryDataSub?:Subscription;

  constructor(private countryService: CountryService) { }


  ngOnInit(): void {
    this.countryDataSub = this.countryService.getAllCountries().subscribe(
      res=>{
        this.countriesData = res;
        this.countriesDataCopy = this.countriesData;
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

  filterRegion(event: any){
    console.log(event.target.value);
    this.selectedRegion = event.target.value;

    if(this.selectedRegion === 'All'){
      this.countriesDataCopy = this.countriesData;
    } else {

    

    this.countriesDataCopy = this.countriesData.filter((item: any) => item.region === this.selectedRegion);

    console.log(this.countriesDataCopy);
    }
  }

}
