import { Component } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-all-services',
  imports: [
    NzSpinComponent,
    NzTableComponent,
    DatePipe,
    NgStyle,
    NzButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.scss'
})
export class AllServicesComponent {
  isSpinning = false;
  services: any = [];

  constructor(private adminService: AdminService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.getAllServices();
  }

  getAllServices() {
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
}
