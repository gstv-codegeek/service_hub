import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StorageService} from '../../../auth/services/storage/storage.service';

const BASE_URL = ["http://localhost:8080/api/v1"]

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  getAllUsers() {
    return this.http.get(BASE_URL + "/users", {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllServices(): Observable<any> {
    return this.http.get(BASE_URL + "/services", {
      headers: this.createAuthorizationHeader()
    });
  }

  getMyServices(providerId: any): Observable<any> {
    return this.http.get(BASE_URL + "/services/provider/" + providerId, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASE_URL + "/categories", {
      headers: this.createAuthorizationHeader()
    });
  }

  getProviderBookings(providerId: string): Observable<any> {
    return this.http.get(BASE_URL + "/bookings/provider/" + providerId, {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(id: number, status: string): Observable<any> {
    return this.http.get(BASE_URL + "/booking/"+ id +"/" + status, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(BASE_URL + "/booking/delete/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }


}
