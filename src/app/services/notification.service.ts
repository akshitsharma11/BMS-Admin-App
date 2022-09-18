import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  serverUrl  = API_USERS_URL;

  tokenString;

  constructor(private http:HttpClient) {
    if(localStorage.getItem("adminAuthTokenBMS")!=null)
    {
      this.tokenString = 'Bearer '+localStorage.getItem("adminAuthTokenBMS").replace(/^["'](.+(?=["']$))["']$/, '$1');
    }
  }

  sendNotificationsToAllUsers(data)
  {
    return this.http.post(this.serverUrl+'/notifications/users/',data,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  sendNotificationsToMultipleUsers(data)
  {
    return this.http.post(this.serverUrl+'/notifications/multiple-users/',data,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }
  
}
