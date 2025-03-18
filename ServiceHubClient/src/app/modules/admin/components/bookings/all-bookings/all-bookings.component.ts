import {Component} from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzFilterTriggerComponent, NzTableComponent, NzTableSortFn, NzThAddOnComponent} from 'ng-zorro-antd/table';
import {MatButton} from '@angular/material/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {MatTable} from '@angular/material/table';
import {NzDividerComponent} from 'ng-zorro-antd/divider';


@Component({
  selector: 'app-all-bookings',
  imports: [
    NgForOf,
    NgIf,
    NzSpinComponent,
    NzTableComponent,
    NgStyle,
    DatePipe,
    MatButton,
    NzThAddOnComponent,
    NzFilterTriggerComponent,
    NzIconDirective,
    NzDropdownMenuComponent,
    FormsModule,
    NzInputDirective,
    MatTable,
    NzDividerComponent
  ],
  templateUrl: './all-bookings.component.html',
  styleUrl: './all-bookings.component.scss'
})
export class AllBookingsComponent {
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

  constructor(private adminService: AdminService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.getAllBookings();
    this.getAllUsers();
    this.getAllServices();
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

  createServiceMap() {
    this.services.forEach((service: any) => {
      this.serviceMap.set(service.id, service.serviceName)
    })
  }

  getAllServices() {
    this.adminService.getAllServices().subscribe({
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

  changeStatus(bookingId:number, status:string) {
    this.isSpinning = true;
    this.adminService.changeBookingStatus(bookingId, status).subscribe({
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
    this.adminService.deleteBooking(bookingId).subscribe({
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
