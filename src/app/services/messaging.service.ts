import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  // messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging,private http:HttpClient) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    })
  }

  requestPermission() {
    console.log("Token")
      this.angularFireMessaging.requestToken.subscribe(
      (token) => {
      console.log(token);
      },
      (err) => {
        console.log("Error occured");
      // console.error('Unable to get permission to notify.', err);
      }
      );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
    (payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    })
  }

  listen() {
    this.angularFireMessaging.messages
      .subscribe((message) => { console.log(message); });
  }

  sendNotification(title,message,token)
  {
  }


  //for one signal notification
  sendIosNotification(title,message,token)
  {
  }

}




