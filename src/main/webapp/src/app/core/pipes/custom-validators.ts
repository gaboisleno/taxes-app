import { AbstractControl } from '@angular/forms';

export function onlyNumbersValidator(control: AbstractControl) {
  const controlValue = control.value;
  const regex = new RegExp('^[0-9]*$');
  if (!regex.test(controlValue)) {
    return { isNotNumber: true };
  }
  return null;
}
