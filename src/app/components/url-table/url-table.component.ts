import { Component, inject, signal } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { UrlStore } from '../../state/url.store';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-url-table',
  standalone: true,
  imports: [TableModule, QRCodeModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './url-table.component.html',
  styleUrls: ['./url-table.component.scss'],
})
export class UrlTableComponent {
  readonly store = inject(UrlStore);
  private messageService = inject(MessageService);

  rows = signal(10);
  rowsPerPageOptions = [10, 25, 50, 100];

  copyAndOpenUrl(shortUrl: string, fullUrl: string) {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        console.log('Short URL copied to clipboard:', shortUrl);

        const newTab = window.open(fullUrl, '_blank');

        if (newTab) {
          newTab.focus();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not open the full URL. Please check your popup blocker settings.',
          });
        }
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not copy short URL.',
        });
      });
  }
}
