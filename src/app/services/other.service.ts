import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class OtherService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  getAlarms(): Observable<any> {
    return this.http.get(`${this.apiURL}/alarms`);
  }

  getWeathers(): Observable<any> {
    return this.http.get(`${this.apiURL}/weathers`);
  }

  onSwitchAlarm(item: Item): Observable<any> {
    return this.http.put(`${this.apiURL}/alarms/${item._id}`, item);
  }

}
