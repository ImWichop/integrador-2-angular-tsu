import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { OtherService } from 'src/app/services/other.service';
import { successDialog } from 'src/app/functions/alerts';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {
  alarms: Item[] = [];
  temp = 30;
  constructor(private otherService: OtherService) {
    this.getAlarms();
   }

  ngOnInit(): void {
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
      });
    });
  }

  getAlarms(): void {
    this.otherService.getAlarms().subscribe((data: any) => {
      this.alarms = data;
    });
  }

}
