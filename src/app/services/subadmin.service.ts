import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SubadminService {
  
  serverUrl  = API_USERS_URL;

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
  
  getSingleSubAdmin(subAdminId)
  {
    return this.http.get(this.serverUrl+'/sub-admins/'+subAdminId,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  createNewSubAdmin(data)
  {
    return this.http.post(this.serverUrl+'/sub-admins/create',data,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  editSingleSubAdmin(subAdminId,data)
  {
    return this.http.patch(this.serverUrl+'/sub-admins/'+subAdminId,data,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  deleteSingleSubAdmin(subAdminId)
  {
    return this.http.delete(this.serverUrl+'/sub-admins/'+subAdminId,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

}
