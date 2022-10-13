import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StudioService {

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

  getAllStudios() {
    return this.http.get(this.serverUrl + '/studios/', {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  getSingleStudio(id) {
    return this.http.get(this.serverUrl + '/studios/' + id, {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  createNewStudio(data) {
    return this.http.post(this.serverUrl + '/studios/create', data, {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  editSingleStudio(studioId, data) {
    return this.http.patch(this.serverUrl + '/studios/' + studioId, data, {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  uploadSingleImage(data) {
    return this.http.post(this.serverUrl + '/upload-single-image', data);
  }

  uploadMultipleImages(data) {
    return this.http.post(this.serverUrl + '/upload-multiple-images', data);
  }

  getAllStudiosByDate(data) {
    return this.http.post(this.serverUrl + '/studios/date-filter/', data, {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

  changeStudioStatus(studioId) {
    return this.http.get(this.serverUrl + '/studios/' + studioId + '/active', {
      headers: new HttpHeaders({
        'Authorization': this.tokenString
      })
    });
  }

}
