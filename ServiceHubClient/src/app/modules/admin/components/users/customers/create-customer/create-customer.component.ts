import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {AdminService} from '../../../../services/admin.service';
import {AuthService} from '../../../../../../auth/services/auth/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-customer',
  imports: [
    FormsModule,
    MatButton,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzSpinComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent {
  isSpinning = false;
  createCustomerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit() {
    this.createCustomerForm = this.fb.group({
      fullName: [null, [Validators.required]],
      username: [null],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      idNumber: [null, [Validators.required]],
      // password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}&/)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.validateConfirmPassword]],
    });
  }

  validateConfirmPassword = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true}
    } else if (control.value !== this.createCustomerForm.controls["password"].value) {
      return {confirm: true, error: true}
    }
    return {};
  }

  createCustomer() {
    console.log(this.createCustomerForm.value);
    if (this.createCustomerForm.valid) {
      this.authService.register(this.createCustomerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.message.success("Customer created successfully!", {nzDuration: 5000});
          this.router.navigateByUrl("/admin/customers");
        },
        error: (err) => {
          this.message.error("Could not create customer", {nzDuration: 5000})
        }
      });
    }
  }
}
