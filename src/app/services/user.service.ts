import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  onSignUp(user: User): Observable<any> {
    return this.http.post(`${this.apiURL}/users`, user);
  }

  getUsers() {
    return this.http.get(`${this.apiURL}/users`);
  }
}
