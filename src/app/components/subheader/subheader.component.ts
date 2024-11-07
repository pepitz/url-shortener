import { Component, signal } from '@angular/core';

import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [PanelModule],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.scss',
})
export class SubheaderComponent {
  title = signal('URL Shortener');
  descriptionText = signal(
    'The URL Shortener is a tool for shortening a long URL in order to provide better readability and more precise branded naming. A user clicking on the Short URL or scanning the QR Code will land on the exact same website like when entering the original URL in a browser.'
  );
}
