import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: any[] = [
    {img: 'assets/light.svg', title: 'Lights', path: 'lights'},
    {img: 'assets/key.svg', title: 'Doors', path: 'doors'},
    {img: 'assets/weather.svg', title: 'Weather', path: 'others'},
    {img: 'assets/alarm.svg', title: 'Alarm', path: 'others'},
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  goToComponent(path: string): void {
    this.router.navigate(['/home', path]);
  }

}
