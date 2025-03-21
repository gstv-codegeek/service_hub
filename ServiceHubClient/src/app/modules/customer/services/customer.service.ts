import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StorageService} from '../../../auth/services/storage/storage.service';
import {Observable} from 'rxjs';

const BASE_URL = ["http://localhost:8080/api/v1"]

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

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

  getAllCategories(): Observable<any> {
    return this.http.get(BASE_URL + "/categories", {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllServices(): Observable<any> {
    return this.http.get(BASE_URL + "/services", {
      headers: this.createAuthorizationHeader()
    });
  }

  getMyBookings(customerId: any): Observable<any> {
    return this.http.get(BASE_URL + "/bookings/customer/" + customerId, {
      headers: this.createAuthorizationHeader()
    });
  }

  getUnbookedServices(customerId: any): Observable<any> {
    return this.http.get(BASE_URL + "/services/unbooked/customer/" + customerId, {
      headers: this.createAuthorizationHeader()
    });
  }

  bookService(bookingDto: any): Observable<any> {
    return this.http.post(BASE_URL + "/service/book", bookingDto, {
      headers: this.createAuthorizationHeader()
    });
  }
}
