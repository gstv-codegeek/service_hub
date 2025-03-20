import { Component } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzModalService, NzModalContentDirective, NzModalComponent} from 'ng-zorro-antd/modal';
import {NzInputDirective} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-all-categories',
  imports: [
    MatButton,
    NgForOf,
    NzSpinComponent,
    NzTableComponent,
    NgIf,
    NzDividerComponent,
    ReactiveFormsModule,
    NzInputDirective,
    NzModalContentDirective,
    NzModalComponent
  ],
  providers: [NzModalService],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss'
})
export class AllCategoriesComponent {

  isSpinning = false;
  categories: any = [];
  isUpdateModalVisible = false;
  updateForm!: FormGroup;
  selectedCategoryId: any;

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

  deleteCategory(categoryId:number) {
    this.isSpinning = true;
    this.adminService.deleteCategory(categoryId).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.categories = this.categories.filter((b: { id: number; }) => b.id !== categoryId);
        this.getAllCategories();
        this.message.success("Category was deleted successfully", {nzDuration: 5000});
      },
      error: () => {
        this.isSpinning = false;
        this.message.error("Could not delete category!", {nzDuration: 5000});
      }
    });
  }

  // open update category modal
  openUpdateModal(category: any): void {
    this.selectedCategoryId = category.id;
    this.updateForm = this.fb.group({
      categoryName: [category.categoryName, [Validators.required]]
    });
    this.isUpdateModalVisible = true;
  }

  updateCategory() {
    if (this.updateForm.valid) {
      this.isSpinning = true;
      const updatedCategory = this.updateForm.value;
      this.adminService.updateCategory(this.selectedCategoryId, updatedCategory).subscribe({
        next: (res) => {
          console.log(res);
          this.isSpinning = false;
          this.categories = [...this.categories];
          this.getAllCategories();
          this.message.success("Category was updated successfully", {nzDuration: 5000});
          this.handleCancel();
        },
        error: (err) => {
          this.isSpinning = false;
          console.log(err);
          this.message.error("Could not update category! Error: " + err, {nzDuration: 5000});
        }
      });
    }


  }

  // Close modal
  handleCancel(): void {
    this.isUpdateModalVisible = false;
  }
}
