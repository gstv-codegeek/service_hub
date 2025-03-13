import { Component } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzFormDirective} from 'ng-zorro-antd/form';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NzInputDirective,
    ReactiveFormsModule,
    NzButtonComponent,
    NzSpinComponent,
    NzFormDirective
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  isSpinning: boolean = false;


  constructor(private adminService: AdminService,private message: NzMessageService) {}

  ngOnInit() {
    this.getAllProviders();
    this.getAllCustomers();

  }



  // ========= USER METHODS ========== //
  providers: any = [];
  customers: any = [];
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
