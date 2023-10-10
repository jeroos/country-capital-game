import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit} from '@angular/core';

type Data = { [key: string]: string; };

@Component({
  selector: 'app-country-capital',
  templateUrl: './country-capital.component.html',
  styleUrls: ['./country-capital.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryCapitalComponent implements OnInit {
  @Input()
  data: Data = {};

  buttonList: string[] = [];
  selectedButton: string | null = null;
  previousButton: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.buttonList = this.randomOrder(
      [...Object.keys(this.data), ...Object.values(this.data)]
    );
  }

  randomOrder(countries: string[]): string[] {
    for (let i = countries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [countries[i], countries[j]] = [countries[j], countries[i]];
    }
    return countries;
  }

  selectButton(button: string) {
    if (!this.selectedButton) {
      this.selectedButton = button;
    } else {
      if (this.data[this.selectedButton] === button || this.data[button] === this.selectedButton) {
        this.buttonList = this.buttonList.filter(b => b !== button && b !== this.selectedButton);
        this.previousButton = null;
        this.selectedButton = null;
      } else {
        this.previousButton = this.selectedButton;
        this.selectedButton = button;
        setTimeout(() => {
          this.previousButton = null;
          this.selectedButton = null;
          this.cdr.detectChanges();
        }, 1000);
      }
    }
  }

}
