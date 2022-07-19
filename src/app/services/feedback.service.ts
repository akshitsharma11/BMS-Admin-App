import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  serverUrl  = 'http://ec2-3-221-149-159.compute-1.amazonaws.com:5000/api';
  
  tokenString;

  constructor(private http:HttpClient) {
    if(localStorage.getItem("adminAuthToken")!=null)
    {
      this.tokenString = 'Bearer '+localStorage.getItem("adminAuthToken").replace(/^["'](.+(?=["']$))["']$/, '$1');
    }
  }

  getAllFeedbacks()
  {
    return this.http.get(this.serverUrl+'/feedbacks/',{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }
  
  getAllUserReports()
  {
    return this.http.get(this.serverUrl+'/reports/user/',{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  getAllTopicReports()
  {
    return this.http.get(this.serverUrl+'/reports/topic/',{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

}
