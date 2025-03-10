import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {StorageService} from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    NzRowDirective,
    NzSpinComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private message: NzMessageService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login() {
    // console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("/admin/dashboard");
        } else if (StorageService.isProviderLoggedIn()) {
          this.router.navigateByUrl("/provider/dashboard");
        } else if (StorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl("/customer/dashboard");
        } else {
          this.message.error("Bad Credentials", {nzDuration: 5000});
        }
      },
      error: (err) => {this.message.error("Something went wrong")}
    });
  }
}
