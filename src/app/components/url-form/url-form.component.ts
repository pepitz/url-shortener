import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ControlComponent } from '../control/control.component';
import { CommonModule } from '@angular/common';
import { predefinedShortAPIPath } from '../../../assets/api/api';
import { ShortUrlCreationRequest } from '../../models/short-url.model';
import { UrlStore } from '../../state/url.store';
import { UrlValidatorDirective } from '../../directives/url-validator.directive';

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
  isLoading = this.urlStore.isLoading;

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const longUrlValue = formData.form.value['longURL'];
    let shortUrlValue = formData.form.value['shortURL'];

    // Generate a random 5-character string if shortUrl is empty
    if (!shortUrlValue) {
      shortUrlValue = this.generateRandomString();
    }

    // Prefix the predefined path
    const fullShortUrl = `${predefinedShortAPIPath}${shortUrlValue}`;

    const creationRequest: ShortUrlCreationRequest = {
      shortUrl: fullShortUrl,
      fullUrl: longUrlValue,
      creationDate: new Date().toISOString(),
    };

    this.urlStore.createShortUrl(creationRequest);

    formData.form.reset();
  }

  // Function to generate a random 5-character alphanumeric string
  private generateRandomString(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let letterCount = 0;
    let numberCount = 0;

    while (result.length < 5) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));

      // Ensure we have a combination of at least three letters and two numbers
      if (/[a-zA-Z]/.test(randomChar) && letterCount < 3) {
        result += randomChar;
        letterCount++;
      } else if (/[0-9]/.test(randomChar) && numberCount < 2) {
        result += randomChar;
        numberCount++;
      } else if (result.length < 5 && letterCount + numberCount >= 3) {
        // Allow any character once base conditions are met
        result += randomChar;
      }
    }

    return result;
  }
}
