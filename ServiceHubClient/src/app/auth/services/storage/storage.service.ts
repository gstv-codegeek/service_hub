import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    return JSON.parse(<string>window.localStorage.getItem(USER));
  }

  static getUserId(): string {
    return this.getUser().id;
  }

  static getUserRole(): string {
    return this.getUser().role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) return false
    return this.getUserRole() == "Admin";
  }

  static isProviderLoggedIn(): boolean {
    if (this.getToken() == null) return false
    return this.getUserRole() == "Provider";
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() == null) return false
    return this.getUserRole() == "Customer";
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

  static isTokenValid(): boolean {
    const token = this.getToken();
    if (!token){
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  static isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

}
