import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-all-bookings',
  imports: [
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzSpinComponent,
    NzTableComponent,
    NgStyle,
    DatePipe
  ],
  templateUrl: './all-bookings.component.html',
  styleUrl: './all-bookings.component.scss'
})
export class AllBookingsComponent {
  isSpinning = false;
  bookingForm!: FormGroup;
  bookings: any = [];

  constructor(private adminService: AdminService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.getAllBookings();
  }

  getAllBookings() {
    this.isSpinning = true
    this.adminService.getAllBookings().subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.bookings = res;
        console.log("All Bookings: ", res);
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error("Something went wrong");
      }
    })
  }
}
