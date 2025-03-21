import {Component} from '@angular/core';
import {AdminService} from '../../../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzTableComponent} from "ng-zorro-antd/table";
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective, NzModalService} from 'ng-zorro-antd/modal';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';

@Component({
  selector: 'app-users',
  imports: [
    MatButton,
    NgForOf,
    NzDividerComponent,
    NzSpinComponent,
    NzTableComponent,
    NgIf,
    NzInputDirective,
    NzModalComponent,
    ReactiveFormsModule,
    NzModalContentDirective,
    NzFormItemComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzFormControlComponent
  ],
  providers: [NzModalService],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss'
})
export class ProvidersComponent {

  isSpinning: boolean = false;
  providers: any = [];
  isUpdateModalVisible = false;
  updateForm!: FormGroup;
  selectedProviderId: any;

  constructor(
    private adminService: AdminService,
    private message: NzMessageService,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.getAllProviders();
  }

  getAllProviders(): any {
    this.isSpinning = true;
    this.adminService.getAllProviders().subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.providers = res;
        console.log("All Providers: ", res);
      },
      error: (err) => {this.isSpinning = false; this.message.error("Could not get providers");}
    });
  }

  deleteProvider(providerId:number) {
    this.isSpinning = true;
    this.adminService.deleteUser(providerId).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.providers = this.providers.filter((b: { id: number; }) => b.id !== providerId);
        this.getAllProviders();
        this.message.success("Provider was deleted successfully", {nzDuration: 5000});
      },
      error: () => {
        this.isSpinning = false;
        this.message.error("Could not delete provider!", {nzDuration: 5000});
      }
    });
  }

  // open update provider modal
  openUpdateModal(provider: any): void {
    this.selectedProviderId = provider.id;
    this.updateForm = this.fb.group({
      businessName: [provider.businessName, [Validators.required]],
      username: [provider.username],
      email: [provider.email, [Validators.required, Validators.email]],
      phoneNumber: [provider.phoneNumber, [Validators.required]],
      idNumber: [provider.idNumber, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.validateConfirmPassword]],
    });
    this.isUpdateModalVisible = true;
  }
  validateConfirmPassword = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true}
    } else if (control.value !== this.updateForm.controls["password"].value) {
      return {confirm: true, error: true}
    }
    return {};
  }

  updateProvider() {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      this.isSpinning = true;
      const updatedProvider = this.updateForm.value;
      this.adminService.updateUser(this.selectedProviderId, updatedProvider).subscribe({
        next: (res) => {
          console.log(res);
          this.isSpinning = false;
          this.providers = [...this.providers];
          this.getAllProviders();
          this.message.success("Provider was updated successfully", {nzDuration: 5000});
          this.handleCancel();
        },
        error: (err) => {
          this.isSpinning = false;
          console.log(err);
          this.message.error("Could not update provider! Error: " + err, {nzDuration: 5000});
        }
      });
    }else {
      this.message.error("Something went wrong. Make sure you have filled all required fields", {nzDuration: 5000});
    }
  }

  // Close modal
  handleCancel(): void {
    this.isUpdateModalVisible = false;
  }
}
