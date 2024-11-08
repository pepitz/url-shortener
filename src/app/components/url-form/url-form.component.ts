import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [ControlComponent, FormsModule],
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlFormComponent {
  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const enteredLongUrl = formData.form.value['longURL'];
    const enteredShortUrl = formData.form.value['shortURL'];
    console.log('longURL', enteredLongUrl);
    console.log('shortURL', enteredShortUrl);

    formData.form.reset();
  }
}
