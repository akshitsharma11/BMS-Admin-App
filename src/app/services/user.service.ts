import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverUrl = API_USERS_URL;

  tokenString;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("adminAuthTokenBMS") != null) {
      this.tokenString = 'Bearer ' + localStorage.getItem("adminAuthTokenBMS").replace(/^["'](.+(?=["']$))["']$/, '$1');
    }
  }

  private listeners = new Subject<any>();
  listen(): Observable<any> {
    return this.listeners.asObservable();
  }

  filter(filterBy) {
    this.listeners.next(filterBy);
  }

  getAllUsers() {
    return this.http.get(this.serverUrl + '/users/', {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  deleteSingleUser(id) {
    return this.http.delete(this.serverUrl + '/users/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  editUserDetails(data) {
    return this.http.post(this.serverUrl + '/edit-username-bio/', data, {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  changeBlockingStatus(id, data) {
    return this.http.patch(this.serverUrl + '/users/' + id + '/blocking-status', data);
  }

  unblockUser(id) {
    return this.http.get(this.serverUrl + '/users/' + id + '/unblock');
  }

  // Dashboard APIs
  getDashboardCounts() {
    return this.http.get(this.serverUrl + '/dashboard-counts/', {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  getUserGraph(data) {
    return this.http.get(this.serverUrl + '/users/graph', {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  getStudioGraph(data) {
    return this.http.get(this.serverUrl + '/studios/graph', {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  getBookingGraph(data) {
    return this.http.get(this.serverUrl + '/bookings/graph', {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  getTransactionGraph(data) {
    return this.http.get(this.serverUrl + '/transactions/graph', {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }
}
