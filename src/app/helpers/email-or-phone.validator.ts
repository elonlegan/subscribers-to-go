import { UntypedFormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function EmailOrPhone() {
  return (formGroup: UntypedFormGroup) => {
    const email = formGroup.controls['Email'];
    const countryCode = formGroup.controls['CountryCode'];
    const phoneNumber = formGroup.controls['PhoneNumber'];

    if (email.value && !email.errors?.['email']) {
      email.setErrors(null);
      countryCode.setErrors(null);
      phoneNumber.setErrors(null);

      return;
    }

    if (countryCode.value && phoneNumber.value) {
      email.setErrors(null);
      countryCode.setErrors(null);
      phoneNumber.setErrors(null);
      return;
    }

    email.setErrors({ requiredEmailOrPhone: true });
    countryCode.setErrors({ requiredEmailOrPhone: true });
    phoneNumber.setErrors({ requiredEmailOrPhone: true });
  };
}
function setError(state: boolean) {}
