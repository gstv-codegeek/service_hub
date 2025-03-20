import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CustomerService} from '../../services/customer.service';
import {AdminService} from '../../../admin/services/admin.service';

@Component({
  selector: 'app-solutions',
  imports: [
    MatButton,
    NgForOf,
    NzSpinComponent,
    NzTableComponent
  ],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss'
})
export class SolutionsComponent {
  isSpinning = false;
  services: any = [];
  categories: any = [];
  categoryMap = new Map<number, string>();
  users: any = [];
  userMap = new Map<number, string>();

  constructor(private customerService: CustomerService, private message: NzMessageService) {}

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
}
