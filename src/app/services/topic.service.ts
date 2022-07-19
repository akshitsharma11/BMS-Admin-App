import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  
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

  getAllTopics()
  {
    return this.http.get(this.serverUrl+'/all-topics/');
  }  

  uploadSingleImage(data)
  {
    return this.http.post(this.serverUrl+'/upload-single-image/',data);
  }

  createNewTopic(data)
  {
    return this.http.post(this.serverUrl+'/create-new-topic/',data);
  }

  getAllTopicChats()
  {
    return this.http.get(this.serverUrl+'/all-topic-chats/');
  }  

  editSingleTopic(data)
  {
    return this.http.post(this.serverUrl+'/edit-topic-details/',data);
  }

  toggleDefaultTopic(id,data)
  {
    return this.http.patch(this.serverUrl+'/topics/'+id+'/toggle-default',data);
  }

}
