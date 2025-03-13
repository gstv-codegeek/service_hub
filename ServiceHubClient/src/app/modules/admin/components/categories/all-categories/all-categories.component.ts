import { Component } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-all-categories',
  imports: [],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss'
})
export class AllCategoriesComponent {

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
