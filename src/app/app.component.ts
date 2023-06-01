import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']


})
export class AppComponent {
  title = 'converterITop';
  amount: number = 0;
  convertedAmount: number = 0;
  baseCurrency: string = 'UAH';
  targetCurrency: string = 'USD';

  currencies: Array<String> = [];
  exchangeRates = new Map<String, number>();

  baseValue: number = 0;
  targetValue: number = 0;
  response:any;
  constructor(private http: HttpClient){
    this.init();
  }
  search(){
    this.http.get('http://api.apilayer.com/fixer/latest?base=' + this.baseCurrency + '&apikey=3c791001beb9904bb0f80b71fd51f061')
      .subscribe((response)=>{
        this.response = response;
        this.exchangeRates = this.response.rates
        for (const key in this.response.rates) {
          this.currencies.push(key);
        }
        const rates = this.response['rates'];
        const rateTo = rates[this.targetCurrency];
        const convertedAmount = this.amount * rateTo;
        console.log(`convertedAmount : ${convertedAmount}`);
        console.log(this.amount)
      })
  }

  init(){
    this.http.get('http://api.apilayer.com/fixer/latest?base=' + this.baseCurrency + '&apikey=3c791001beb9904bb0f80b71fd51f061')
      .subscribe((response)=>{
        this.response = response;
        this.exchangeRates = this.response.rates
        for (const key in this.response.rates) {
          this.currencies.push(key);
        }
      })

  }
  convert(): void {
    const baseRate = this.exchangeRates.get(this.baseCurrency) || 0;
    const targetRate = this.exchangeRates.get(this.targetCurrency) || 0;
    this.targetValue = (this.baseValue * targetRate) / baseRate;
  }

  reverseConvert(): void {
    const baseRate = this.exchangeRates.get(this.baseCurrency) || 0;
    const targetRate = this.exchangeRates.get(this.targetCurrency) || 0;
    this.baseValue = (this.targetValue * baseRate) / targetRate;

  }

}
