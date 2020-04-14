import { Component, OnInit } from '@angular/core';
import { LightService } from 'src/app/services/light.service';
import { Item } from 'src/app/models/item';
import { successDialog } from 'src/app/functions/alerts';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  rooms: Item[] = [];
  value: string;
  constructor(private lightService: LightService) {
    this.getLeds();
   }

  ngOnInit(): void {
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
      });
    });
  }

  getLeds(): void {
    this.lightService.getLeds().subscribe((data: any) => {
      this.rooms = data;
    });
  }

}
