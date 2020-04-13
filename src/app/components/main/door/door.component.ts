import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { DoorService } from 'src/app/services/door.service';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css'],
})
export class DoorComponent implements OnInit {
  doors: Item[] = [
    {name: 'Door 1', feed: 'puerta1', value: '', text: ''},
    {name: 'Door 2', feed: 'puerta2', value: '', text: ''},
    {name: 'Door 3', feed: 'puerta3', value: '', text: ''}
  ];
  constructor(private doorService: DoorService) {
    this.getStatus();
  }

  ngOnInit(): void {
  }

  onSwitchDoor(door: Item): void {
  }

  getStatus(): void {
  }
}
