import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './components/countries/countries.component';
import { CountryComponent } from './components/country/country.component';

const routes: Routes = [
{path: '', redirectTo: 'countries', pathMatch:'full'},
{path: 'countries', component: CountriesComponent},
{path: 'country/:code', component: CountryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
