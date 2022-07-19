import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  serverUrl  = 'https://bookmystudioapp.herokuapp.com/api';

  constructor(private http:HttpClient) {
  }

  sendNotificationsToAllUsers(data)
  {
    return this.http.post(this.serverUrl+'/send-notification-all-users/',data);
  }  
  
}
