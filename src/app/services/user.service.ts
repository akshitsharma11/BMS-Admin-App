import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverUrl  = 'http://ec2-3-221-149-159.compute-1.amazonaws.com:5000/api';

  tokenString;

  constructor(private http:HttpClient) {
    if(localStorage.getItem("adminAuthToken")!=null)
    {
      this.tokenString = 'Bearer '+localStorage.getItem("adminAuthToken").replace(/^["'](.+(?=["']$))["']$/, '$1');
    }
  }

  private listeners = new Subject<any>();
  listen():Observable<any>{
    return this.listeners.asObservable();
  }

  filter(filterBy)
  {
    this.listeners.next(filterBy);
  }

  getAllUsers()
  {
    return this.http.get(this.serverUrl+'/all-users/',{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }  

  deleteSingleUser(id)
  {
    return this.http.get(this.serverUrl+'/delete-user/'+id,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }  
  
  editUserDetails(data)
  {
    return this.http.post(this.serverUrl+'/edit-username-bio/',data,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  changeBlockingStatus(id,data)
  {
    return this.http.patch(this.serverUrl+'/users/'+id+'/blocking-status',data);
  }

  unblockUser(id)
  {
    return this.http.get(this.serverUrl+'/users/'+id+'/unblock');
  }

}
