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

    // token = "f3XiyVUmbeBQTfCTvcgs5_:APA91bEk5Tee6ujjEovUefADYm_2g0qp7edzt__8qadiu-YHXdGHh7qqBeaUTbxHwe5OL_HHBvK3oWB2mblUXtMH_MWwtX6LrLqWpGRYs66lkRFY-uEPIi9pZcNUQpY9nBV2BTmxIDw8";
  sendNotification(title,message,token)
  {
    // console.log(title,message,token)
   return this.http.post('https://fcm.googleapis.com/fcm/send',{
      "notification": {
      // "title": "Hey there", 
      // "body": "Subscribe to might ghost hack youtube channel"
      "title": title, 
      "body": message
      },
      // "to" : "f3XiyVUmbeBQTfCTvcgs5_:APA91bEk5Tee6ujjEovUefADYm_2g0qp7edzt__8qadiu-YHXdGHh7qqBeaUTbxHwe5OL_HHBvK3oWB2mblUXtMH_MWwtX6LrLqWpGRYs66lkRFY-uEPIi9pZcNUQpY9nBV2BTmxIDw8"
      "to":token
    },{headers: new HttpHeaders({
       'Content-Type':'application/json',
       'Authorization':'key=AAAAMaS6mIQ:APA91bHGujOl4V4QrtV-XOvgU7Go5c62k5DnMIQdodPnI9TPPQK-uhv2ydXxdvz5dCZ0aseb8sIjBjV6SFoL-9a3EtroVSb-b3COywM4YELFABlQag23MXM7eQk5Gu0G_7JEqIIpMSWK'
     })})
  }


  //for one signal notification
  sendIosNotification(title,message,token)
  {
    // console.log(title,message,token)
   return this.http.post('https://onesignal.com/api/v1/notifications',{
    app_id: "fec0b1c3-f072-4b70-9048-f79388e01968",
    // include_player_ids: ["04c1c2f6-9b52-4e85-a914-dddaf18a7082"],
    include_player_ids: [token],    
    data: {"foo": "bar"},
    // contents: {"en": "Title:"+title+"\nMessage:"+message}
    contents: {"en":title.toUpperCase()+"\n"+message}
    
    },{headers: new HttpHeaders({
       'Content-Type':'application/json',
       'Authorization':'Basic NjQzMjNjYzktYmI2OC00YWMxLWJmMTgtYjQ1NjYzYzViOTZl'
     })})
  }

}




