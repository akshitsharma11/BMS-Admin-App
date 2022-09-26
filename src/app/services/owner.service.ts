import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

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

  getAllOwners()
  {
    return this.http.get(this.serverUrl+'/owners/',{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  createNewOwner(data)
  {
    return this.http.post(this.serverUrl+'/owners/create',data,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  deleteSingleOwner(ownerId)
  {
    return this.http.delete(this.serverUrl+'/owners/'+ownerId,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

}
