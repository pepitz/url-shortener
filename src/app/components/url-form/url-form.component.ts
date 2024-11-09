import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ControlComponent } from '../control/control.component';
import { CommonModule } from '@angular/common';
import { predefinedShortAPIPath } from '../../../assets/api/api';
import { ShortUrlCreationRequest } from '../../models/short-url.model';
import { UrlStore } from '../../state/url.store';

@Component({
  selector: 'app-url-form',
  standalone: true,
  providers: [UrlStore],
  imports: [ControlComponent, FormsModule, CommonModule],
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlFormComponent {
  private urlStore = inject(UrlStore);

  longUrl = signal('');
  shortUrl = signal(`${predefinedShortAPIPath}`);
  isLoading = this.urlStore.isLoading;

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

    this.urlStore.createShortUrl(creationRequest);

    formData.form.reset();
  }
}
