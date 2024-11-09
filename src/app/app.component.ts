import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { SubheaderComponent } from './components/subheader/subheader.component';

import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UrlFormComponent, SubheaderComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'url-shortener';
}
