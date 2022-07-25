import { Component, OnInit, OnDestroy} from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

  constructor(private countryService: CountryService, private route: ActivatedRoute) { }

  singleCountryData?: any;
  singleCountryDataSub?: Subscription;

  neighbourCountriesSub?: Subscription;

  firstLanguage?:any;
  currency?: any;
  languages?: any;
  borderCountries? : any;

  borderCountriesData?: any[] = [];

  changeTheme: boolean = false;

  eventHandler(event: boolean){
    this.changeTheme = event;
  }


  ngOnInit(): void {

    
    if(window.localStorage.getItem('toggledTheme')){
      this.changeTheme = true;
    }

    this.route.paramMap.subscribe(
      params=>{
        const name = params.get('name');
       // console.log(name);

        if(name){
         this.singleCountryDataSub = this.countryService.getCountryByName(name).subscribe(
            res=>{
              this.singleCountryData = res;

              console.log(this.singleCountryData[0].cca3);

              this.firstLanguage = Object.keys(this.singleCountryData[0].languages)[0];
              this.currency = Object.entries(this.singleCountryData[0].currencies)[0];
              this.languages = Object.entries(this.singleCountryData[0].languages);
      

              this.borderCountries = this.singleCountryData[0].borders;

             this.neighbourCountriesSub = this.countryService.getNeighboursByCode(this.borderCountries).subscribe(
                resp=>{
              this.borderCountriesData = resp;

             // console.log(resp);
                }
              )
              //console.log(this.currency);
            }
          )
        }

      }
    )
    


}



ngOnDestroy(): void{
this.singleCountryDataSub?.unsubscribe();
this.neighbourCountriesSub?.unsubscribe();
}

}
