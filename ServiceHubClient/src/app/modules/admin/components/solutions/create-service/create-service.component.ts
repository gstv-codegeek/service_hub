import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzSpinComponent} from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-create-service',
  imports: [
    NzButtonComponent,
    NzInputDirective,
    NzSpinComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss'
})
export class CreateServiceComponent {
  isSpinning = false;
  serviceForm!: FormGroup;


  constructor(private adminService: AdminService, private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.serviceForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?&')]],
      providerId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
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
}
