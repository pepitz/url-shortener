import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { UrlTableComponent } from './components/url-table/url-table.component';
import { SubheaderComponent } from './components/subheader/subheader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UrlFormComponent, UrlTableComponent, SubheaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'url-shortener';
}
