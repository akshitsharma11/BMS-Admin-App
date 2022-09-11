import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

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

  getAllDiscounts()
  {
    return this.http.get(this.serverUrl+'/discounts',{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }
  
  getSingleDiscountDetails(discountId)
  {
    return this.http.get(this.serverUrl+'/discounts/'+discountId,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

  editSingleDiscountDetails(discountId,discountData)
  {
    return this.http.patch(this.serverUrl+'/discounts/'+discountId,discountData,{headers:new HttpHeaders({
      'Authorization':this.tokenString
    })});
  }

}
