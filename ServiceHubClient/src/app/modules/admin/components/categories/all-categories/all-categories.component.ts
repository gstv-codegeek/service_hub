import { Component } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-all-categories',
  imports: [
    MatButton,
    NgForOf,
    NzSpinComponent,
    NzTableComponent
  ],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss'
})
export class AllCategoriesComponent {

  isSpinning = false;
  categories: any = [];

  constructor(private adminService: AdminService, private message: NzMessageService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(): any {
    this.adminService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        console.log("ALl Categories: ", res);
      },
      error: (err) => {this.message.error("Something went wrong");}
    });
  }
}
