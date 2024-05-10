import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://127.0.0.1:8000'; // Adjust your API URL accordingly

  constructor(private http: HttpClient) {}

  getStockData(ticker: string, startDate: string, endDate: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/load_data/`, {
      ticker: ticker,
      start_date: startDate,
      end_date: endDate
    });
  }

  getDailyData(ticker: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data/day/`, { ticker });
  }

  getWeeklyData(ticker: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data/week/`, { ticker });
  }
  getMonthlyData(ticker: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data/month/`, { ticker });
  }
  getYearlyData(ticker: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data/year/`, { ticker });
  }
}
