import {Component} from '@angular/core';
import {DatePipe, NgForOf, NgStyle} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzTableComponent, NzThAddOnComponent} from "ng-zorro-antd/table";
import {FormBuilder} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CustomerService} from '../../services/customer.service';
import {StorageService} from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-bookings',
  imports: [
    DatePipe,
    MatButton,
    NgForOf,
    NzSpinComponent,
    NzTableComponent,
    NzThAddOnComponent,
    NgStyle
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {
  isSpinning = false;
  bookings: any = [];
  serviceMap = new Map<number, string>();
  services: any = [];
  users: any = [];
  userMap = new Map<number, string>();

  createServiceMap() {
    this.services.forEach((service: any) => {
      this.serviceMap.set(service.id, service.serviceName)
    })
  }

  createUserMap() {
    this.users.forEach((user: any) => {
      this.userMap.set(user.id, user.fullName ?? user.businessName);
    })
  }
  sortByDate = (a: any, b: any) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime();

  sortByService = (a: any, b: any) => (this.serviceMap.get(a.serviceId) || '').localeCompare(this.serviceMap.get(b.serviceId) || '');

  sortByStatus = (a: any, b: any) => a.bookingStatus.localeCompare(b.bookingStatus);

  constructor(private customerService: CustomerService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.getMyBookings();
    this.getAllServices();
    this.getAllUsers();
  }


  getMyBookings() {
    this.isSpinning = true
    this.customerService.getMyBookings(StorageService.getUserId()).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.bookings = res;
        console.log("My Bookings: ", res);
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error("Could not get bookings");
      }
    })
  }

  getAllServices() {
    this.customerService.getAllServices().subscribe({
      next: (res) => {
        this.services = res;
        this.createServiceMap();
        console.log("All Services: ", res);
      },
      error: (err) => {
        this.message.error("Could not get services");
      }
    })
  }

  getAllUsers() {
    this.customerService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.createUserMap()
        console.log("All Users: ", res);
      },
      error: (err) => {
        this.message.error("Could not get users");
      }
    })
  }
}
