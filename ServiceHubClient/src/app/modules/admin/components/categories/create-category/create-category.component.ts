import { Component } from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-create-category',
  imports: [
    NzFormDirective,
    NzButtonComponent,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzInputDirective,
    NzSpinComponent,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

  isSpinning: boolean = false;
  categoryForm!: FormGroup;


  constructor(private adminService: AdminService, private message: NzMessageService, private fb: FormBuilder) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName: [null, [Validators.required]],
    });
  }

  createCategory() {
    this.isSpinning = true;
    this.adminService.createCategory(this.categoryForm.value).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.message.success("Category created Successfully", {nzDuration: 5000});
      },
      error: (err) => {
        this.isSpinning = false;
        console.log(err);
        this.message.error("Category could not be created", {nzDuration: 5000});
      }
    })
  }
}
