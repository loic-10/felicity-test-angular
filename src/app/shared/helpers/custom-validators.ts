import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export class CustomValidators {
  constructor() {}

  static onlyChar(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('^[a-zA-Z ]*$');
      if (re.test(control.value)) {
        return null;
      } else {
        return { onlyChar: true };
      }
    };
  }
  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl: any = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }

  static customErrorField = (
    form: FormGroup,
    controlName: string,
    errorName: string
  ) => {
    return form.controls[controlName].hasError(errorName);
  };

  static displayFieldMessageError = (form: FormGroup, controlName: string) => {
    return (
      form.controls[controlName].pristine || form.controls[controlName].valid
    );
  };

  static valueNotEqualDefault(controlName: string, defaultValue: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      // set error on matchingControl if validation fails
      if (control.value === defaultValue) {
        control.setErrors({ valueNotEqualDefault: true });
      } else {
        control.setErrors(null);
      }
      return null;
    };
  }
}
