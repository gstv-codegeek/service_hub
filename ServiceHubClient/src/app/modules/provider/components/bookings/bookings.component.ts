import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzTableComponent, NzThAddOnComponent} from "ng-zorro-antd/table";
import {AdminService} from '../../../admin/services/admin.service';
import {FormBuilder} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CustomerService} from '../../../customer/services/customer.service';
import {ProviderService} from '../../services/provider.service';
import {StorageService} from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-bookings',
  imports: [
    DatePipe,
    MatButton,
    NgForOf,
    NgIf,
    NzDividerComponent,
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
  users: any = [];
  userMap = new Map<number, string>();
  services: any = [];
  serviceMap = new Map<number, string>();
  sortByCustomer = (a: any, b: any) => (this.userMap.get(a.customerId) || '').localeCompare(this.userMap.get(b.customerId) || '');

  sortByDate = (a: any, b: any) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime();

  sortByService = (a: any, b: any) => (this.serviceMap.get(a.serviceId) || '').localeCompare(this.serviceMap.get(b.serviceId) || '');

  sortByStatus = (a: any, b: any) => a.bookingStatus.localeCompare(b.bookingStatus);

  constructor(private providerService: ProviderService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.getAllBookings();
    this.getAllUsers();
    this.getAllServices();
  }

  createUserMap() {
    this.users.forEach((user: any) => {
      this.userMap.set(user.id, user.fullName ?? user.businessName);
    })
  }

  createServiceMap() {
    this.services.forEach((service: any) => {
      this.serviceMap.set(service.id, service.serviceName)
    })
  }

  getAllServices() {
    this.providerService.getAllServices().subscribe({
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
    this.providerService.getAllUsers().subscribe({
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

  getAllBookings() {
    this.isSpinning = true
    this.providerService.getProviderBookings(StorageService.getUserId()).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.bookings = res;
        this.createUserMap()
        console.log("All Bookings: ", res);
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error("Something went wrong");
      }
    })
  }

  changeStatus(bookingId:number, status:string) {
    this.isSpinning = true;
    this.providerService.changeBookingStatus(bookingId, status).subscribe({
      next: (res) => {
        this.isSpinning = false;
        const index = this.bookings.findIndex((b: { id: number; }) => b.id === bookingId);
        if (index !== -1) {
          this.bookings[index].bookingStatus = status;
          this.bookings = [...this.bookings];
        }
        this.message.success("Booking updated successfully!", {nzDuration: 5000});

        this.getAllBookings();
      },
      error: () => {
        this.isSpinning = false;
        this.message.error("Could not update booking status!", {nzDuration: 5000});
      }
    });
  }

  deleteBooking(bookingId:number) {
    this.isSpinning = true;
    this.providerService.deleteBooking(bookingId).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.bookings = this.bookings.filter((b: { id: number; }) => b.id !== bookingId);
        this.getAllBookings();
        this.message.success("Booking was deleted successfully", {nzDuration: 5000});
      },
      error: () => {
        this.isSpinning = false;
        this.message.error("Could not delete booking!", {nzDuration: 5000});
      }
    });
  }
}
