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
  totalAdminTopics = 0;
  totalUserTopics = 0;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(res=>{
      this.totalUsers = res["users"].length;       
    });

    // this.topicService.getAllTopics().subscribe(resTopic=>{
    //   console.log(resTopic["allTopics"]);
    //   this.totalAdminTopics = resTopic["allTopics"].filter(i=>i.creatorType==0).length;
    //   this.totalUserTopics = resTopic["allTopics"].filter(i=>i.creatorType==1).length;
    // });

  }
  sendNotification()
  {
    // this.messagingService.sendNotification(this.token).subscribe(res=>{
    //   console.log(res);
    // }); 
  }

}
