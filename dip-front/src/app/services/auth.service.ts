import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {FormControl, ɵValue} from "@angular/forms";

export interface User {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://diplomawebapi.azurewebsites.net/Auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: ɵValue<FormControl<string>> | undefined, password: ɵValue<FormControl<string>> | undefined): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password });
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgotPassword`, { email });
  }

  logout(): Observable<any> {
    return of(true);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
}

