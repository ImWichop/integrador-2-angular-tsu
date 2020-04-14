import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { DoorService } from 'src/app/services/door.service';
import { successDialog } from 'src/app/functions/alerts';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css'],
})
export class DoorComponent implements OnInit {
  doors: Item[] = [];
  constructor(private doorService: DoorService) {
    this.getDoors();
  }

  ngOnInit(): void {
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
      });
    });
  }

  getDoors(): void {
    this.doorService.getDoors().subscribe((data: any) => {
      this.doors = data;
    });
  }
}
