import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-all-bookings',
  imports: [
    NgForOf,
    NgIf,
    NzSpinComponent,
    NzTableComponent,
    NgStyle,
    DatePipe,
    MatButton
  ],
  templateUrl: './all-bookings.component.html',
  styleUrl: './all-bookings.component.scss'
})
export class AllBookingsComponent {
  isSpinning = false;
  bookingForm!: FormGroup;
  bookings: any = [];
  users: any = [];
  userMap = new Map<number, string>();

  constructor(private adminService: AdminService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.getAllBookings();
    this.getAllUsers();
  }

  getAllBookings() {
    this.isSpinning = true
    this.adminService.getAllBookings().subscribe({
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
  createUserMap() {
    this.users.forEach((user: any) => {
      this.userMap.set(user.id, user.fullName)
    })
  }

  getAllUsers() {
    this.adminService.getAllUsers().subscribe({
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
  getBookingById(id: number) {
    this.adminService.getBookingById(id).subscribe({

    });
  }

  getUserById(id: number) {
    this.adminService.getUserById(id).subscribe({

    });
  }

  getServiceById(id: number) {
    this.adminService.getServiceById(id).subscribe({

    });
  }

  changeStatus(id:number, status:string) {
    this.isSpinning = true;
    this.adminService.changeBookingStatus(id, status).subscribe({
      next: () => {
        this.isSpinning = false;
        this.message.success("Booking updated successfully!", {nzDuration: 5000});
      },
      error: () => {
        this.isSpinning = false;
        this.message.error("Could not update booking status!", {nzDuration: 5000});
      }
    });
  }

  deleteBooking(id:number) {
    this.isSpinning = true;
    this.adminService.deleteBooking(id).subscribe({
      next: () => {
        this.isSpinning = false;
        this.message.success("Booking was deleted successfully", {nzDuration: 5000});
      },
      error: () => {
        this.isSpinning = false;
        this.message.error("Could not delete booking!", {nzDuration: 5000});
      }
    });
  }

}
