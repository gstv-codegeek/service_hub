import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminService} from '../../../../admin/services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ProviderService} from '../../../services/provider.service';
import {StorageService} from '../../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-create-service',
  imports: [
    MatButton,
    NgForOf,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzOptionComponent,
    NzSelectComponent,
    NzSpinComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss'
})
export class CreateServiceComponent {
  isSpinning = false;
  serviceForm!: FormGroup;
  categories: any = [];

  constructor(private providerService: ProviderService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.serviceForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });

    this.getAllCategories();
  }


  createService() {
    this.isSpinning = true;
    const serviceDto = {
      ...this.serviceForm.value,
      providerId: StorageService.getUserId()
    };
    console.log(serviceDto);
    this.providerService.createService(serviceDto).subscribe({
      next: (res) => {
        this.isSpinning=false;
        this.message.success("Service created successfully", {nzDuration: 5000});
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error("Something went wrong or you may have already created this service!");
      }
    });
  }

  getAllCategories(): any {
    this.providerService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        console.log("ALl Categories: ", res);
      },
      error: (err) => {this.message.error("Something went wrong");}
    });
  }
}
