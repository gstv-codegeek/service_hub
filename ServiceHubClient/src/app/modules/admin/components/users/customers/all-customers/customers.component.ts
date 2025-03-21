import { Component } from '@angular/core';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {MatButton} from '@angular/material/button';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NgForOf, NgIf} from '@angular/common';
import {AdminService} from '../../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective, NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-customers',
  imports: [
    NzSpinComponent,
    NzTableComponent,
    MatButton,
    NzDividerComponent,
    NgForOf,
    NgIf,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzModalComponent,
    ReactiveFormsModule,
    NzModalContentDirective
  ],
  providers: [NzModalService],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  isSpinning: boolean = false;
  customers: any = [];
  isUpdateModalVisible = false;
  updateForm!: FormGroup;
  selectedCustomerId: any;

  constructor(private adminService: AdminService,private message: NzMessageService, private fb: FormBuilder) {}


  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers(): any {
    this.isSpinning = true;
    this.adminService.getAllCustomers().subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.customers = res;
        console.log("All Customers: ", res);
      },
      error: (err) => {this.isSpinning = false; this.message.error("Could not get customers");}
    });
  }

  deleteCustomer(customerId:number) {
    this.isSpinning = true;
    this.adminService.deleteUser(customerId).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.customers = this.customers.filter((b: { id: number; }) => b.id !== customerId);
        this.getAllCustomers();
        this.message.success("Customer was deleted successfully", {nzDuration: 5000});
      },
      error: () => {
        this.isSpinning = false;
        this.message.error("Could not delete customer!", {nzDuration: 5000});
      }
    });
  }

  // open update customer modal
  openUpdateModal(customer: any): void {
    this.selectedCustomerId = customer.id;
    this.updateForm = this.fb.group({
      fullName: [customer.fullName, [Validators.required]],
      username: [customer.username],
      email: [customer.email, [Validators.required, Validators.email]],
      phoneNumber: [customer.phoneNumber, [Validators.required]],
      idNumber: [customer.idNumber, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.validateConfirmPassword]],
    });
    this.isUpdateModalVisible = true;
  }
  validateConfirmPassword = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true}
    } else if (control.value !== this.updateForm.controls["password"].value) {
      return {confirm: true, error: true}
    }
    return {};
  }

  updateCustomer() {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      this.isSpinning = true;
      const updatedCustomer = this.updateForm.value;
      this.adminService.updateUser(this.selectedCustomerId, updatedCustomer).subscribe({
        next: (res) => {
          console.log(res);
          this.isSpinning = false;
          this.customers = [...this.customers];
          this.getAllCustomers();
          this.message.success("Customer was updated successfully", {nzDuration: 5000});
          this.handleCancel();
        },
        error: (err) => {
          this.isSpinning = false;
          console.log(err);
          this.message.error("Could not update customer! Error: " + err, {nzDuration: 5000});
        }
      });
    }else {
      this.message.error("Something went wrong. Make sure you have filled all required fields", {nzDuration: 5000});
    }
  }

  // Close modal
  handleCancel(): void {
    this.isUpdateModalVisible = false;
  }

  protected readonly open = open;
}
