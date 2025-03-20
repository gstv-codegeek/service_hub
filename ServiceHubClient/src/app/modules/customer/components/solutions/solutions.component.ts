import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CustomerService} from '../../services/customer.service';
import {NzModalComponent, NzModalContentDirective, NzModalService} from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {Router} from '@angular/router';
import {StorageService} from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-solutions',
  imports: [
    MatButton,
    NgForOf,
    NzSpinComponent,
    NzTableComponent,
    NzModalComponent,
    ReactiveFormsModule,
    NzDatePickerComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzModalContentDirective
  ],
  providers: [NzModalService],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss'
})
export class SolutionsComponent {
  isSpinning = false;
  isBookModalVisible = false;
  bookingForm!: FormGroup;
  selectedServiceId: any;
  selectedServiceName: any;
  services: any = [];
  categories: any = [];
  categoryMap = new Map<number, string>();
  users: any = [];
  userMap = new Map<number, string>();

  constructor(private customerService: CustomerService, private message: NzMessageService, private fb: FormBuilder, private router:Router) {}

  ngOnInit() {

    this.getAllServices();
    this.getAllCategories();
    this.getAllUsers();
  }

  createUserMap() {
    this.users.forEach((user: any) => {
      this.userMap.set(user.id, user.businessName)
    })
  }

  createCategoryMap() {
    this.categories.forEach((category: any) => {
      this.categoryMap.set(category.id, category.categoryName);
    })
  }

  getAllUsers() {
    this.customerService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.createUserMap();
        console.log("All Users: ", res);
      },
      error: (err) => {
        this.message.error("Could not get users");
      }
    })
  }

  getAllCategories() {
    this.customerService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.createCategoryMap();
        console.log("All Categories: ", res);
      },
      error: (err) => {
        this.message.error("Something went wrong");
      }
    })
  }

  getAllServices() {
    this.isSpinning = true
    this.customerService.getAllServices().subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.services = res;
        console.log("All Services: ", res);
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error("Something went wrong");
      }
    })
  }

  // Book Service
  // open update category modal
  openBookModal(service: any): void {
    this.selectedServiceId = service.id;
    this.selectedServiceName = service.serviceName;
    this.bookingForm = this.fb.group({
      serviceDate: [null, [Validators.required]]
    });
    this.isBookModalVisible = true;
  }

  bookService() {
    if (this.bookingForm.valid) {
      this.isSpinning = true;
      const bookingDto = {
        ...this.bookingForm.value,
        customerId: StorageService.getUserId(),
        serviceId: this.selectedServiceId
      }
      this.customerService.bookService(bookingDto).subscribe({
        next: (res) => {
          this.isSpinning = false;
          this.message.success("Service was booked successfully", {nzDuration: 5000});
          this.router.navigateByUrl("customer/bookings");
          this.handleCancel();
        },
        error: (err) => {
          this.isSpinning = false;
          console.log(err);
          this.message.error("Could not book service! Error: " + err, {nzDuration: 5000});
        }
      });
    }


  }

  // Close modal
  handleCancel(): void {
    this.isBookModalVisible = false;
  }
}
