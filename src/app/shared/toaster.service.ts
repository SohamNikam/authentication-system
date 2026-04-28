import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  public toast$ = this.toastSubject.asObservable();

  constructor() {}

  showToast(message: string, type: 'success' | 'error', duration: number = 3000) {
    this.toastSubject.next({ message, type, duration });

    // Auto hide after duration
    setTimeout(() => {
      this.toastSubject.next(null);
    }, duration);
  }

  hideToast() {
    this.toastSubject.next(null);
  }
}