import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppApi {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://api.apilayer.com/fixer/latest?base=USD&apikey=25amIDYt8lMEviqfpSCJuxPIp8qDx8H9';

  public getExchangeRates() {
    return this.http.get(this.apiUrl);
  }
  getCurrencyValue(currency: string) {
    return this.http.get(`${this.apiUrl}&symbols=${currency}`);
  }
}
