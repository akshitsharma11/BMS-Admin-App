import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
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

  //bar chart (for users)
  barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      onClick: (e) => e.stopPropagation(),
      labels: {
        boxWidth: 0
      }
    },
    scales: {
      yAxes: [{
        gridLines: {
          display: true
        },
        display: true,
        ticks: {
          stepSize: 4,
          min: 0
        }
      }]
    }
  };

  barChartOptions1: ChartOptions = {
    responsive: true,
    legend: {
      onClick: (e) => e.stopPropagation(),
      labels: {
        boxWidth: 0
      }
    },
    scales: {
      yAxes: [{
        gridLines: {
          display: true
        },
        display: true,
        ticks: {
          stepSize: 9000,
          min: 0
        }
      }]
    }
  };

  usersChartLabels = [];
  studiosChartLabels = [];
  bookingsChartLabels = [];
  transactionsChartLabels = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  usersChartData: ChartDataSets[] = [
    { data: [], label: 'Users Per Month' }
  ];

  studiosChartData: ChartDataSets[] = [
    { data: [], label: 'Studios Per Month' }
  ];

  bookingsChartData: ChartDataSets[] = [
    { data: [], label: 'Bookings Per Month' }
  ];

  transactionsChartData: ChartDataSets[] = [
    { data: [], label: 'Transactions Per Month' }
  ];

  public barChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)']
    }
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDashboardCounts().subscribe(res => {
      this.totalUsers = res["users"];
      this.totalStudios = res["studios"];
      this.totalBookings = res["bookings"];
    });

    this.userService.getUserGraph({}).subscribe(graphRes => {
      graphRes["allData"].forEach(singleGraph => {
        singleGraph.month = this.getMonth(singleGraph.month);
        this.usersChartLabels.push(`${singleGraph.month} ${singleGraph.year}`);
        this.usersChartData[0].data.push(singleGraph.userCount);
      });
    });

    this.userService.getStudioGraph({}).subscribe(graphRes => {
      graphRes["allData"].forEach(singleGraph => {
        singleGraph.month = this.getMonth(singleGraph.month);
        this.studiosChartLabels.push(`${singleGraph.month} ${singleGraph.year}`);
        this.studiosChartData[0].data.push(singleGraph.studioCount);
      });
    });

    this.userService.getBookingGraph({}).subscribe(graphRes => {
      graphRes["allData"].forEach(singleGraph => {
        singleGraph.month = this.getMonth(singleGraph.month);
        this.bookingsChartLabels.push(`${singleGraph.month} ${singleGraph.year}`);
        this.bookingsChartData[0].data.push(singleGraph.bookingCount);
      });
    });

    this.userService.getTransactionGraph({}).subscribe(graphRes => {
      graphRes["allData"].forEach(singleGraph => {
        singleGraph.month = this.getMonth(singleGraph.month);
        this.transactionsChartLabels.push(`${singleGraph.month} ${singleGraph.year}`);
        this.transactionsChartData[0].data.push(singleGraph.transactionCount);
      });
    });
  }

  getMonth(m) {
    return this.mS.filter(month => m.includes(month))[0];
  }

}
