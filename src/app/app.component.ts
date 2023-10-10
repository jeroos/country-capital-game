import {Component} from '@angular/core';
import {COUNTRIES} from "./db-data";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'country-capital';

  countries = COUNTRIES;
}
