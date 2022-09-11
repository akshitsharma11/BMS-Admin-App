import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubadminService {
  serverUrl  = 'http://ec2-3-109-47-228.ap-south-1.compute.amazonaws.com/api';

  tokenString;

  constructor(private http:HttpClient) {
    if(localStorage.getItem("adminAuthTokenBMS")!=null)
    {
      this.tokenString = 'Bearer '+localStorage.getItem("adminAuthTokenBMS").replace(/^["'](.+(?=["']$))["']$/, '$1');
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

  getAllSubAdmins()
  {
    return this.http.get(this.serverUrl+'/sub-admins/',{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  createNewSubAdmin(data)
  {
    return this.http.post(this.serverUrl+'/sub-admins/create',data,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

}
