import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  getAllCountries():Observable<any[]>{
    return this.http.get<any[]>(this.apiBaseUrl + 'all');
  }

  getCountryByName(name: string):Observable<any>{
    return this.http.get<any[]>(this.apiBaseUrl + 'alpha?codes=' + name);
  }

  getNeighboursByCode(codes: string):Observable<any[]>{
    return this.http.get<any[]>(this.apiBaseUrl + 'alpha?codes=' + codes);
  }

}
