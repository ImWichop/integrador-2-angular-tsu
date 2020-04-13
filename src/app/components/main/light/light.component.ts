import { Component, OnInit } from '@angular/core';
import { LightService } from 'src/app/services/light.service';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  rooms: Item[] = [
    {name: 'Room 1', feed: 'cuarto1', value: '' , text: ''},
    {name: 'Room 2', feed: 'cuarto2', value: '' , text: ''},
    {name: 'Room 3', feed: 'cuarto3', value: '' , text: ''},
    {name: 'Room 4', feed: 'cuarto4', value: '' , text: ''},
    {name: 'Room 5', feed: 'cuarto5', value: '' , text: ''},
  ];
  value: string;
  constructor(private lightService: LightService) {
    this.getStatus();
   }

  ngOnInit(): void {
  }

  onSwitchLed(room: Item): void {
  }

  getStatus(): void {
  }

}
