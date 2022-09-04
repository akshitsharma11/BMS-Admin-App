import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartScales, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as CanvasJS from '../../assets/canvasjs.min';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  totalUsers = 0;
  totalStudios = 0;
  totalBookings = 0;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getDashboardCounts().subscribe(res=>{
      this.totalUsers = res["users"];
      this.totalStudios = res["studios"];
      this.totalBookings = res["bookings"];      
    });
  }

}
