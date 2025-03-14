import { Component } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-all-services',
  imports: [
    NzSpinComponent,
    NzTableComponent,
    DatePipe,
    NgStyle,
    NzButtonComponent,
    NgForOf,
    NgIf,
    MatButton
  ],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.scss'
})
export class AllServicesComponent {
  isSpinning = false;
  services: any = [];
  categories: any = [];
  categoryMap = new Map<number, string>();
  users: any = [];
  userMap = new Map<number, string>();

  constructor(private adminService: AdminService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.getAllServices();
    this.getAllCategories();
    this.getAllUsers();
  }

  createUserMap() {
    this.users.forEach((user: any) => {
      this.userMap.set(user.id, user.fullName)
    })
  }

  createCategoryMap() {
    this.categories.forEach((category: any) => {
      this.categoryMap.set(category.id, category.categoryName);
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

  getAllCategories() {
    this.adminService.getAllCategories().subscribe({
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
