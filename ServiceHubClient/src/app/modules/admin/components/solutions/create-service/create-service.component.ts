import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NgForOf} from '@angular/common';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-create-service',
  imports: [
    NzInputDirective,
    NzSpinComponent,
    ReactiveFormsModule,
    NzFormDirective,
    NgForOf,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzOptionComponent,
    NzSelectComponent,
    MatButton
  ],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss'
})
export class CreateServiceComponent {
  isSpinning = false;
  serviceForm!: FormGroup;
  providers: any = [];
  categories: any = [];


  constructor(private adminService: AdminService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.serviceForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      providerId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });

    this.getAllProviders();
    this.getAllCategories();
  }


  createService() {
    this.isSpinning = true;
    this.adminService.createService(this.serviceForm.value).subscribe({
      next: (res) => {
        this.isSpinning=false;
        this.message.success("Service created successfully", {nzDuration: 5000});
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error("Something went wrong");
      }
    });
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
