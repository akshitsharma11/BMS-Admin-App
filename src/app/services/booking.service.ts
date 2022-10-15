import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

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

  getAllBookings() {
    return this.http.get(this.serverUrl + '/bookings/', {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  getAllBookingsByDateRange(data) {
    return this.http.post(this.serverUrl + '/bookings/date-filter/', data, {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  getAvailability(payload) {
    return this.http.post(this.serverUrl + '/bookings/availability-check', payload, {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  saveBooking(payload) {
    return this.http.post(this.serverUrl + '/bookings/create', payload, {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

}
