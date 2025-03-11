import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../../../auth/services/storage/storage.service';

const BASE_URL = ["http://localhost:8080/api/v1/admin"]

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

  createCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASE_URL + "/category", categoryDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASE_URL + "/categories", {
      headers: this.createAuthorizationHeader()
    });
  }


  //=========== PROVIDER SERVICES ==============//
  createService(serviceDto: any): Observable<any> {
    return this.http.post(BASE_URL + "/service", serviceDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllServices(): Observable<any> {
    return this.http.get(BASE_URL + "/services", {
      headers: this.createAuthorizationHeader()
    })
  }
}
