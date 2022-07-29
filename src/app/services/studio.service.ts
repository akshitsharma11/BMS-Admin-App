import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

  serverUrl  = 'https://bookmystudioapp.herokuapp.com/api';

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

  getAllStudios()
  {
    return this.http.get(this.serverUrl+'/studios/',{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  createNewStudio(data)
  {
    return this.http.post(this.serverUrl+'/studios/create',data,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

}
