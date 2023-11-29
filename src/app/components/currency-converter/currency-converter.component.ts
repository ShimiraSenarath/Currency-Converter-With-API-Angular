import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  amount: number = 1.00;
  baseCurrency: string = 'EUR';
  targetCurrency: string = 'USD';
  currencies: any[] = [ ];
  convertedValue: number | null = null;
  apiKey: string = 'fca_live_FI52TxSmvSB156BKcFZ8QHu6LahDjYU0kwdFh6zu';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${this.apiKey}`)
      .subscribe((data: any) => {
        this.currencies = Object.entries(data.data).map(([code, name]) => ({
          code,
          name,
          flag: `assets/images/flags/${code.toLowerCase()}-flag.png`,
        })); console.log("hi", this.currencies);
        
      });
  }

  convert() {

    if (!this.baseCurrency || !this.targetCurrency) {
      console.error('Please select both from and to currencies.');
      return;
    }
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest/?apikey=${this.apiKey}&${this.baseCurrency}/${this.targetCurrency}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      const conversionRate = data.data[this.targetCurrency] / data.data[this.baseCurrency];
      this.convertedValue = this.amount * conversionRate;
    });
  }

}
