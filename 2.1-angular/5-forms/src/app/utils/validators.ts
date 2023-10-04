import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static isValidPassword(control: AbstractControl) {
    const value = control.value;

    if (
      !value
        .split('')
        .some(
          (c) =>
            '0'.charCodeAt(0) <= c.charCodeAt(0) &&
            c.charCodeAt(0) <= '9'.charCodeAt(0)
        )
    ) {
      return { password_number: true };
    }

    return null;
  }

  static match(target: AbstractControl) {
    return function isEqual(control: AbstractControl) {
      if (control.value !== target.value) {
        return { match: true };
      }

      return null;
    };
  }
}
