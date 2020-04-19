import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { OtherService } from 'src/app/services/other.service';
import { successDialog } from 'src/app/functions/alerts';
import Ws from '@adonisjs/websocket-client';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {
  alarms: Item[] = [];
  temp;
  ws: any;
  channel: any;
  constructor(private otherService: OtherService) {
    this.getAlarms();
    this.getWeather();
   }

  ngOnInit(): void {
    this.ws = Ws('ws://localhost:3333', {
      path: 'ws'
    });

    this.ws.connect();
    this.channel = this.ws.subscribe('home');

    this.channel.on('alarms', (data: any) => {
      this.getAlarms();
    });

    this.channel.on('weathers', (data: any) => {
      this.temp = data;
      this.otherService.onStoreWeather(data).subscribe((data: any) => {
        console.log('Ok');
      });
    });
  }

  onSwitchAlarm(alarm: Item): void {
    if (alarm.value === 'ON') {
      alarm.value = 'OFF';
    } else {
      alarm.value = 'ON';
    }
    this.otherService.onSwitchAlarm(alarm).subscribe((data: any) => {
      successDialog('Good').then(() => {
        this.getAlarms();
        this.channel.emit('alarm', alarm.value);
      });
    });
  }

  getAlarms(): void {
    this.otherService.getAlarms().subscribe((data: any) => {
      this.alarms = data;
    });
  }

  getWeather(): void {
    this.otherService.getWeathers().subscribe((data: any) => {
      this.temp = data[0].degrees;
    });
  }

}
