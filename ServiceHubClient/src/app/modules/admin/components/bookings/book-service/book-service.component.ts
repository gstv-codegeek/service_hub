import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-book-service',
  imports: [
    NzButtonComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzSpinComponent,
    ReactiveFormsModule,
    NzFormLabelComponent,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    MatButton
  ],
  templateUrl: './book-service.component.html',
  styleUrl: './book-service.component.scss'
})
export class BookServiceComponent {
  isSpinning = false;
  bookingForm!: FormGroup;
  bookings: any = [];
  services: any = [];
  providers: any = [];
  customers: any = [];

  constructor(private adminService: AdminService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      customerId: [null, [Validators.required]],
      serviceId: [null, [Validators.required]],
    });

    this.getAllServices();
    this.getAllCustomers();
    this.getAllProviders();
  }

  getAllServices(){
    this.isSpinning = true
    this.adminService.getAllServices().subscribe({
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

  bookService() {
    this.isSpinning = true;
    this.adminService.bookService(this.bookingForm.value).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.message.success("Service have been booked successfully");
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error("Something went wrong");
      }
    });
  }


  getAllProviders(): any {
    this.isSpinning = true;
    this.adminService.getAllProviders().subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.providers = res;
        console.log("All Providers: ", res);
      },
      error: (err) => {this.isSpinning = false; this.message.error("Something went wrong");}
    });
  }

  getAllCustomers(): any {
    this.isSpinning = true;
    this.adminService.getAllCustomers().subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.customers = res;
        console.log("All Customers: ", res);
      },
      error: (err) => {this.isSpinning = false; this.message.error("Something went wrong");}
    });
  }
}
