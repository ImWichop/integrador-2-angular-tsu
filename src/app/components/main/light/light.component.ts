import { Component, OnInit } from '@angular/core';
import { LightService } from 'src/app/services/light.service';
import { Item } from 'src/app/models/item';
import { successDialog } from 'src/app/functions/alerts';
import Ws from '@adonisjs/websocket-client';
@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  rooms: Item[] = [];
  ws: any;
  channel: any;
  constructor(private lightService: LightService) {
    this.getLeds();
   }

  ngOnInit(): void {
    this.ws = Ws('ws://localhost:3333', {
      path: 'ws'
    });

    this.ws.connect();
    this.channel = this.ws.subscribe('home');

    this.channel.on('leds', (data: any) => {
      console.log('ON');
    });
  }

  onSwitchLed(room: Item): void {
    if (room.value === 'ON') {
      room.value = 'OFF';
    } else {
      room.value = 'ON';
    }
    this.lightService.onSwitchLed(room).subscribe((data: any) => {
      successDialog('Good').then(() => {
        this.getLeds();
        this.channel.emit('led', room.feed + ' ' +  room.value);
      });
    });
  }

  getLeds(): void {
    this.lightService.getLeds().subscribe((data: any) => {
      this.rooms = data;
    });
  }

}
