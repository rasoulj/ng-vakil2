import { ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

export function optionalValidator(validators?: (ValidatorFn | null | undefined)[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (!control.value || !validators) {
            return null;
        }

        let fn = Validators.compose(validators);

        return !fn ? null : fn(control);
    };
}