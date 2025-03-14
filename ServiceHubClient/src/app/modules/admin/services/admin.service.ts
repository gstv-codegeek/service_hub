import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../../../auth/services/storage/storage.service';

const BASE_URL = ["http://localhost:8080/api/v1"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }


  // =========== USER SERVICES ============= //
  getAllProviders() {
    return this.http.get(BASE_URL + "/auth/providers", {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllCustomers() {
    return this.http.get(BASE_URL + "/auth/customers", {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllUsers() {
    return this.http.get(BASE_URL + "/admin/users", {
      headers: this.createAuthorizationHeader()
    })
  }

  getUserById(id: number) {
    return this.http.get(BASE_URL + "/admin/user/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }


  // ===========CATEGORY SERVICES =============== //
  createCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASE_URL + "/admin/category", categoryDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASE_URL + "/admin/categories", {
      headers: this.createAuthorizationHeader()
    });
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(BASE_URL + "/admin/category/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  //=========== PROVIDER SERVICES ==============//
  createService(serviceDto: any): Observable<any> {
    return this.http.post(BASE_URL + "/admin/service", serviceDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllServices(): Observable<any> {
    return this.http.get(BASE_URL + "/admin/services", {
      headers: this.createAuthorizationHeader()
    });
  }

  getServiceById(id: number): Observable<any> {
    return this.http.get(BASE_URL + "/admin/service/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  // ============== BOOKING SERVICES =================== //
  bookService(bookingDto: any): Observable<any> {
    return this.http.post(BASE_URL + "/admin/service/book", bookingDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllBookings(): Observable<any> {
    return this.http.get(BASE_URL + "/admin/bookings", {
      headers: this.createAuthorizationHeader()
    });
  }

  getBookingById(id: number): Observable<any> {
    return this.http.get(BASE_URL + "/admin/booking/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(id: number, status: string): Observable<any> {
    return this.http.get(BASE_URL + "/admin/booking/"+ id +"/" + status, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(BASE_URL + "/admin/booking/delete/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

}
