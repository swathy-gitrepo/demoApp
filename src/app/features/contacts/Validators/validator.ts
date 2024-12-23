import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function alphabeticValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && !/^[a-zA-Z]+$/.test(control.value)) {
        return { 'alphabetic': true }; 
      }
      return null; 
    };
  }

  export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (control.value && !emailRegex.test(control.value)) {
        return { 'emailInvalid': true };
      }
      return null;
    };
  }
  export function addressValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^[a-zA-Z0-9,/\s]+$/;
      if (control.value && !pattern.test(control.value)) {
        return { 'addressInvalid': true };
      }
      return null;
    };
}

export function postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Regex for common postal code formats (US, UK, and general format)
      const postalCodePattern = /^(?!.*[^a-zA-Z0-9\s-])([a-zA-Z0-9\s-]{3,10})$/;
  
      if (control.value && !postalCodePattern.test(control.value)) {
        return { 'postalCodeInvalid': true }; 
      }
      return null; 
    };
  }