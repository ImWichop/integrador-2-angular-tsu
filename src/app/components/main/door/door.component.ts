import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { DoorService } from 'src/app/services/door.service';
import { successDialog } from 'src/app/functions/alerts';
import Ws from '@adonisjs/websocket-client';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css'],
})
export class DoorComponent implements OnInit {
  doors: Item[] = [];
  ws: any;
  channel: any;
  constructor(private doorService: DoorService) {
    this.getDoors();
  }

  ngOnInit(): void {
    this.ws = Ws('ws://localhost:3333', {
      path: 'ws'
    });

    this.ws.connect();
    this.channel = this.ws.subscribe('home');

    this.channel.on('door', (data: any) => {
      console.log('ON');
    });
  }

  onSwitchDoor(door: Item): void {
    if (door.value === 'ON') {
      door.value = 'OFF';
    } else {
      door.value = 'ON';
    }
    this.doorService.onSwitchDoor(door).subscribe((data: any) => {
      successDialog('Good').then(() => {
        this.getDoors();
        this.channel.emit('door', door.feed + ' ' +  door.value);
      });
    });
  }

  getDoors(): void {
    this.doorService.getDoors().subscribe((data: any) => {
      this.doors = data;
    });
  }
}
