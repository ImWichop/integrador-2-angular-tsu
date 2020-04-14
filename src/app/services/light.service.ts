import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LightService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  getLeds(): Observable<any> {
    return this.http.get(`${this.apiURL}/leds`);
  }

  onSwitchLed(item: Item): Observable<any> {
    return this.http.put(`${this.apiURL}/leds/${item._id}`, item);
  }
}
