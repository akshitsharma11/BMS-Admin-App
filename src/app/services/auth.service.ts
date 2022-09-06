import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl  = 'https://bookmystudioapp.herokuapp.com/api';
  
  //Behaviour subject for storing authentication state
  loggedIn = new BehaviorSubject<boolean>(false);
  permissions = new BehaviorSubject<[]>([]);

  //Behaviour subject for storing the user
  authUser = new BehaviorSubject<Object>(null);
  
  constructor(private http:HttpClient,
    private routerBtn:Router) { }


  private listeners = new Subject<any>();
  listen():Observable<any>{
    return this.listeners.asObservable();
  }

  filter(filterBy)
  {
    this.listeners.next(filterBy);
  }

  //method to send signin request to webapi
  loginUser(data)
  {    
    return this.http.post(this.serverUrl+'/admins/login',data);
  } 

  loginSubAdmin(data)
  {    
    return this.http.post(this.serverUrl+'/sub-admins/login',data);
  } 

  //method to implement auto-login functionality
  autoLogin()
  {
  //now we will retrieve all data from local storage , whenever the application restarts             
      const authUserInfo = localStorage.getItem('authUserDataBMS');
      console.log(authUserInfo);
      //checking if that data key exists
      if(!authUserInfo)
      {
          return;
      }
      else{
        //emitting login details to BehaviourSubject
        this.loggedIn.next(true);
        this.authUser.next(JSON.parse(authUserInfo));
      }
  }

  //method to implement LOGOUT  functionality
  logout()
  {    
      //now emitting no user  (setting our User to null)
      this.loggedIn.next(false);

      this.authUser.next(null);
       
      //also, removing user data from localStorage
      localStorage.removeItem('authUserDataBMS');
      localStorage.removeItem('permissions');
      localStorage.removeItem('userType');
            
       //redirecting to different component
       this.routerBtn.navigate(['/admin/login']);
              
  }

  sendToken(data)
  {
    return this.http.post(this.serverUrl+'/admin-send-token',data);
  }

  adminForgotPwd(data)
  {
    return this.http.post(this.serverUrl+'/admin-forgot-password',data);
  }

  adminDetails(adminId)
  {
    return this.http.get(this.serverUrl+'/admins/'+adminId);
  }

  subAdminDetails(id)
  {
    return this.http.get(this.serverUrl+'/all-sub-admins/'+id);
  }
  
  editAdminDetails(data)
  {
    return this.http.post(this.serverUrl+'/edit-admin-details',data); 
  }

  editAdminImage(data)
  {
    return this.http.post(this.serverUrl+'/edit-admin-image',data); 
  }
 
}
