import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToasterService, ToastMessage } from './toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.less']
})
export class ToasterComponent implements OnInit, OnDestroy {
  toast: ToastMessage | null = null;
  private subscription!: Subscription;

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.subscription = this.toasterService.toast$.subscribe(toast => {
      this.toast = toast;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeToast() {
    this.toasterService.hideToast();
  }
}