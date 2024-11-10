import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UrlStore } from '../../state/url.store';
import { CommonModule } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';
import { OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-url-table',
  standalone: true,
  imports: [TableModule, CommonModule, QRCodeModule, Button],
  templateUrl: './url-table.component.html',
  styleUrls: ['./url-table.component.scss'],
})
export class UrlTableComponent implements OnInit {
  readonly store = inject(UrlStore);

  first = 0;
  rows = 10;
  totalRecords = 99;

  pageChange(event: PaginatorState) {
    this.first = event.first!;
    this.rows = event.rows!;
  }

  ngOnInit() {
    console.log('Total records initially:', this.totalRecords);
  }
}
