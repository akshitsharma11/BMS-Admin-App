import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  serverUrl  = 'http://ec2-3-221-149-159.compute-1.amazonaws.com:5000/api';

  constructor(private http:HttpClient) {
  }

  private listeners = new Subject<any>();
  listen():Observable<any>{
    return this.listeners.asObservable();
  }

  filter(filterBy)
  {
    this.listeners.next(filterBy);
  }

  getAllCategories()
  {
    return this.http.get(this.serverUrl+'/categories/');
  }

  postCategory(data)
  {
    return this.http.post(this.serverUrl+'/categories/',data);
  }

  deleteSingleCategory(id)
  {
    return this.http.delete(this.serverUrl+'/categories/'+id);
  }
    
}
