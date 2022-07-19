import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  serverUrl  = 'http://ec2-3-221-149-159.compute-1.amazonaws.com:5000/api';

  constructor(private http:HttpClient) {
  }

  sendNotificationsToAllUsers(data)
  {
    return this.http.post(this.serverUrl+'/send-notification-all-users/',data);
  }  
  
}
