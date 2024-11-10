import { Component, inject, signal } from '@angular/core';

import { QRCodeModule } from 'angularx-qrcode';

import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { UrlStore } from '../../state/url.store';

@Component({
  selector: 'app-url-table',
  standalone: true,
  imports: [TableModule, QRCodeModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './url-table.component.html',
  styleUrls: ['./url-table.component.scss'],
})
export class UrlTableComponent {
  readonly store = inject(UrlStore);

  rows = signal(10);
  rowsPerPageOptions = [10, 25, 50, 100];
}
