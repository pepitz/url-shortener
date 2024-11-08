import { ChangeDetectionStrategy, Component, inject, signal, DestroyRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ControlComponent } from '../control/control.component';
import { ShortUrlCreationRequest, type ShortUrl } from '../../models/short-url.model';
import { UrlShortenService } from '../../services/url-shorten.service';
import { CommonModule } from '@angular/common';
import { predefinedShortAPIPath } from '../../../assets/api/api';

@Component({
  selector: 'app-url-form',
  standalone: true,
  providers: [UrlShortenService],
  imports: [ControlComponent, FormsModule, CommonModule],
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlFormComponent {
  private urlShortenService = inject(UrlShortenService);
  private destroyRef = inject(DestroyRef);
  longUrl = signal('');
  shortUrl = signal(`${predefinedShortAPIPath}`);

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const longUrlValue = formData.form.value['longURL'];
    const shortUrlValue = `${predefinedShortAPIPath}${formData.form.value['shortURL']}`;

    const creationRequest: ShortUrlCreationRequest = {
      shortUrl: shortUrlValue,
      fullUrl: longUrlValue,
      creationDate: new Date().toISOString(),
    };

    const subscription = this.urlShortenService.createShortUrl(creationRequest).subscribe(
      (response: ShortUrl) => {
        console.log('Short URL Created:', response);
      },
      (error: { status: number; message: string }) => {
        console.error('Error creating short URL:', error);
      }
    );

    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    formData.form.reset();
  }
}
