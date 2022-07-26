import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Output() toggledTheme: boolean = false;
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter();

  countriesData:any;

  constructor() { }

  ngOnInit(): void {
    if(window.localStorage.getItem('toggledTheme')){
      this.toggledTheme = true;
    }

  }


  toggleTheme(): void{

    if(window.localStorage.getItem('toggledTheme')){
      this.toggledTheme = !this.toggledTheme;
      window.localStorage.removeItem('toggledTheme');
      this.buttonClicked.emit(this.toggledTheme);

    } else {
      
      this.toggledTheme = !this.toggledTheme;
      window.localStorage.setItem('toggledTheme', `${this.toggledTheme}`);
      this.buttonClicked.emit(this.toggledTheme);
    }

  
  }

}
