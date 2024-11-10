import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { QRCodeModule } from 'angularx-qrcode'; // Import QR code module
import { UrlStore } from '../../state/url.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-url-table',
  standalone: true,
  imports: [FormsModule, TableModule, DropdownModule, ButtonModule, PaginatorModule, QRCodeModule, CommonModule],
  templateUrl: './url-table.component.html',
  styleUrls: ['./url-table.component.scss'],
})
export class UrlTableComponent {
  readonly store = inject(UrlStore);

  // Rows per page options
  rowsPerPageOptions = [10, 25, 50, 100];
  rowsPerPage = signal(this.rowsPerPageOptions[0]);

  // Method to update rows per page
  updateRowsPerPage(event: number) {
    this.rowsPerPage.set(event);
  }
}
