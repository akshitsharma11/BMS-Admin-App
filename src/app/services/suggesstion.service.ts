import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuggesstionService {

  serverUrl  = 'http://ec2-3-221-149-159.compute-1.amazonaws.com:5000/api';

  tokenString = 'Bearer '+localStorage.getItem("adminAuthToken").replace(/^["'](.+(?=["']$))["']$/, '$1');

  constructor(private http:HttpClient) {
  }

  getAllSuggestions()
  {
    return this.http.get(this.serverUrl+'/all-suggestions/',{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }  


}
