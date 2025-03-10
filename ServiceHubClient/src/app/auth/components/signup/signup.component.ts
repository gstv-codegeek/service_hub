import {Component} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Router, RouterLink} from '@angular/router';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';

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
    ReactiveFormsModule

  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private message: NzMessageService
              ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [null, [Validators.required]],
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      idNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.validateConfirmPassword]],
    });
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
    this.authService.register(this.signupForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.message.success("Signup successful", {nzDuration: 5000});
        this.router.navigate(["login"]);
      },
      error: (err) => {this.message.error("Something went wrong", {nzDuration: 5000})}
    });
  }


}
