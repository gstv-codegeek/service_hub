import {Component} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router, RouterLink} from '@angular/router';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";

@Component({
  selector: 'app-signup',
  imports: [
    NzSpinComponent,
    NzFormDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzInputDirective,
    NgIf,
    NzButtonComponent,
    RouterLink,
    NzRowDirective,
    NzColDirective,
    ReactiveFormsModule,
    MatButtonToggle,
    MatButtonToggleGroup,
    FormsModule

  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean = false;
  signupForm!: FormGroup;
  userType: string = 'customer';

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private message: NzMessageService
              ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      businessName: [null],
      fullName: [null],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      idNumber: [null, [Validators.required]],
      // password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}&/)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.validateConfirmPassword]],
    });
  }

  onUserTypeChange(userType: string) {
    this.userType = userType;
    if (userType === 'provider') {
      this.signupForm.get('businessName')?.setValidators(Validators.required);
      this.signupForm.get('fullName')?.clearValidators();
    } else {
      this.signupForm.get('fullName')?.setValidators(Validators.required);
      this.signupForm.get('businessName')?.clearValidators();
    }
    this.signupForm.get('businessName')?.updateValueAndValidity();
    this.signupForm.get('fullName')?.updateValueAndValidity();
  }

  validateConfirmPassword = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true}
    } else if (control.value !== this.signupForm.controls["password"].value) {
      return {confirm: true, error: true}
    }
    return {};
  }


  register() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.message.success("Signup successful. Please login!", {nzDuration: 5000});
          this.router.navigate(["login"]);
        },
        error: (err) => {this.message.error("Something went wrong", {nzDuration: 5000})}
      });
    }
  }



}
