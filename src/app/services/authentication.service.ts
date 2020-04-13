import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  onLogin(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, user);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getJwtToken() {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }
}
