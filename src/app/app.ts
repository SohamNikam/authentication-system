import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterComponent } from './shared/toaster.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToasterComponent],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('client');
}
