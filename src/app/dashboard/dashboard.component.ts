import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartScales, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as CanvasJS from '../../assets/canvasjs.min';
import { SuggesstionService } from '../services/suggesstion.service';
import { TopicService } from '../services/topic.service';
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

  constructor(private userService:UserService,private topicService:TopicService,private suggestionService:SuggesstionService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(res=>{
      this.totalUsers = res["users"].length;       
    });

    this.topicService.getAllTopics().subscribe(resTopic=>{
      console.log(resTopic["allTopics"]);
      this.totalAdminTopics = resTopic["allTopics"].filter(i=>i.creatorType==0).length;
      this.totalUserTopics = resTopic["allTopics"].filter(i=>i.creatorType==1).length;
    });

    // this.suggestionService.getAllSuggestions().subscribe(res=>{
    //   this.totalSuggestions = res["suggestions"].length;       
    // });

    // this.executiveService.getAllExecutives().subscribe(res=>{
    //   this.totalExecutives = res["executives"].length;       
    // });

    // this.userService.getAllUsersGraphData().subscribe(graphRes=>{
    //   this.barChartLabels = graphRes["allMonths"];
    //   this.barChartData[0].data = graphRes["allUserCounts"];
    // });
    
    // this.subscriptionService.getAllSubscriptionsGraphData().subscribe(graphRes=>{
    //   this.barChartLabels2= graphRes["allMonths"];
    //   this.barChartData2[0].data = graphRes["allSubscriptionCounts"];
    // });

    // this.productService.getAllUsersGraphData().subscribe(graphRes=>{
    //   this.barChartLabels = graphRes["allMonths"];
    //   this.barChartData[0].data = graphRes["allUserCounts"];
    // });

  }
  sendNotification()
  {
    // this.messagingService.sendNotification(this.token).subscribe(res=>{
    //   console.log(res);
    // }); 
  }

}
