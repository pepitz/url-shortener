import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appUrlValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlValidatorDirective,
      multi: true,
    },
  ],
})
export class UrlValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const urlPattern = /^(https?:\/\/)([^\s$.?#].[^\s]*)$/;
    if (!control.value) {
      return null;
    }
    return urlPattern.test(control.value) ? null : { invalidUrl: true };
  }
}
