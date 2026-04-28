import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ToasterService } from '../../shared/toaster.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.less',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private _loginService: LoginService, private _toasterService: ToasterService, private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const payload = {
        name: this.signupForm.get('name')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
      };

      this._loginService.signup(payload).subscribe(
        response => {
          if (response.success) {
            this._toasterService.showToast(response.message || 'Signup successful!', 'success');
            console.log('Signup successful:', response);
            // Navigate to welcome page
            this.router.navigate(['/welcome']);
          } else {
            this._toasterService.showToast(response.message || 'Signup failed', 'error');
          }
        },
        error => {
          console.error('Signup failed:', error);
          this._toasterService.showToast('Signup failed. Please try again.', 'error');
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
} 

