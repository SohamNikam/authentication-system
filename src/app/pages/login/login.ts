import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ToasterService } from '../../shared/toaster.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.less',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private _toasterService: ToasterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this._loginService.login(payload).subscribe(
        response => {
          if (response.success) {
            this._toasterService.showToast(response.message, 'success');
            console.log('Login successful:', response);
            // Navigate to welcome page
            this.router.navigate(['/welcome']);
          } else {
            this._toasterService.showToast(response.message || 'Login failed', 'error');
          }
        },
        error => {
          console.error('Login failed:', error);
          this._toasterService.showToast('Login failed. Please try again.', 'error');
        }
      );
    } else {
      console.log('Form is invalid');
      this.loginForm.markAllAsTouched();
    }
  }
}
