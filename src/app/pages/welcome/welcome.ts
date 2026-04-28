import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.less',
})
export class WelcomeComponent implements OnInit {
  userEmail: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // In a real app, you'd get this from a service or route params
    // For now, we'll just show a generic welcome message
  }

  logout() {
    // Clear user session and redirect to login
    // For now, just navigate to login
    this.router.navigate(['/']);
  }
}