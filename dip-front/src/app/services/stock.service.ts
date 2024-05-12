import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getStockData(ticker: string, startDate: string | null, endDate: string | null): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/load_data/`, {
      ticker: ticker,
      start_date: startDate,
      end_date: endDate
    });
  }

  getDataForTimeframe(ticker: string, timeframe: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/data/${timeframe}/`, { ticker });
  }
}
