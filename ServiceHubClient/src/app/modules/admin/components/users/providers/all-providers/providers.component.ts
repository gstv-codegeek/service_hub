import { Component } from '@angular/core';
import {AdminService} from '../../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss'
})
export class ProvidersComponent {

  isSpinning: boolean = false;
  providers: any = [];
  customers: any = [];

  constructor(private adminService: AdminService,private message: NzMessageService) {}

  ngOnInit() {
    this.getAllProviders();
    this.getAllCustomers();
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
