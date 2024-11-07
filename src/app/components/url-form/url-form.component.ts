import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [ControlComponent, FormsModule],
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.scss',
})
export class UrlFormComponent {
  onSubmit(inputUrl: string) {
    console.log('onSubmit', inputUrl);
  }
}
