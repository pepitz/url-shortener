import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ControlComponent } from '../control/control.component';
import { CommonModule } from '@angular/common';
import { predefinedShortAPIPath } from '../../../assets/api/api';
import { ShortUrlCreationRequest } from '../../models/short-url.model';
import { UrlStore } from '../../state/url.store';
import { UrlValidatorDirective } from '../../directives/url-validator.directive';
import { generateRandomShortUrl } from '../../utils/url-generator.util';

@Component({
  selector: 'app-url-form',
  standalone: true,
  providers: [UrlStore],
  imports: [ControlComponent, FormsModule, CommonModule, UrlValidatorDirective],
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlFormComponent {
  private urlStore = inject(UrlStore);

  longUrl = signal('');
  shortUrl = signal(`${predefinedShortAPIPath}`);
  isLoadingCreate = this.urlStore.isLoadingCreate;

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const longUrlValue = formData.form.value['longURL'];
    let shortUrlValue = formData.form.value['shortURL'];

    // Generate a random 5-character string if shortUrl is empty
    if (!shortUrlValue) {
      shortUrlValue = generateRandomShortUrl();
    }

    const fullShortUrl = `${predefinedShortAPIPath}${shortUrlValue}`;

    const creationRequest: ShortUrlCreationRequest = {
      shortUrl: fullShortUrl,
      fullUrl: longUrlValue,
      creationDate: new Date().toISOString(),
    };

    this.urlStore.createShortUrl(creationRequest);

    formData.form.reset();
  }
}
