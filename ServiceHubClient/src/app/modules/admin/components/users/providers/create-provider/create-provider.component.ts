import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthService} from '../../../../../../auth/services/auth/auth.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-provider',
  imports: [
    FormsModule,
    MatButton,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzSpinComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-provider.component.html',
  styleUrl: './create-provider.component.scss'
})
export class CreateProviderComponent implements OnInit{
  isSpinning = false;
  createProviderForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit() {
    this.createProviderForm = this.fb.group({
      businessName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      idNumber: [null, [Validators.required]],
      // password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}&/)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.validateConfirmPassword]],
    });
  }

  validateConfirmPassword = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true}
    } else if (control.value !== this.createProviderForm.controls["password"].value) {
      return {confirm: true, error: true}
    }
    return {};
  }

  createProvider() {
    console.log(this.createProviderForm.value);
    if (this.createProviderForm.valid) {
      this.authService.register(this.createProviderForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl("/admin/providers").then(r => {this.message.success("Provider created successfully!", {nzDuration: 5000})});
        },
        error: (err) => {
          this.message.error("Something went wrong", {nzDuration: 5000});
          console.log(err);
        }
      });
    }
  }
}
