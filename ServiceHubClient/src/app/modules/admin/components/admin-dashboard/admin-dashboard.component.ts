import { Component } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzSpinComponent} from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NzInputDirective,
    ReactiveFormsModule,
    NzButtonComponent,
    NzSpinComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  isSpinning: boolean = false;
  categoryForm!: FormGroup;
  categories: any = [];

  constructor(private adminService: AdminService, private fb: FormBuilder, private message: NzMessageService) {

  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName: [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  createCategory() {
    // console.log(this.categoryForm.value)
    this.isSpinning = true;
    this.adminService.createCategory(this.categoryForm.value).subscribe({
      next: (res) => {
        this.isSpinning = false;
        console.log(res);
        this.message.success("Category created Successfully", {nzDuration: 5000});
      },
      error: (err) => {
        this.isSpinning = false;
        console.log(err);
        this.message.error("Category could not be created", {nzDuration: 5000});
      }
    })
  }

  getAllCategories(): any {
    this.adminService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        console.log(res);
      },
      error: (err) => {this.message.error("Something went wrong")}
    });
  }
}
