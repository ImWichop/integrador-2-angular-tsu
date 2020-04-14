import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoorService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) { }

  getDoors(): Observable<any> {
    return this.http.get(`${this.apiURL}/doors`);
  }

  onSwitchDoor(item: Item): Observable<any> {
    return this.http.put(`${this.apiURL}/doors/${item._id}`, item);
  }
}
