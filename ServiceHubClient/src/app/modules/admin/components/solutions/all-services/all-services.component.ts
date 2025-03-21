import {Component} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {FormBuilder} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-all-services',
  imports: [
    NzSpinComponent,
    NzTableComponent,
    NgForOf,
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
      this.userMap.set(user.id, user.businessName)
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
        this.createUserMap();
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
