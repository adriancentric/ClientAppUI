import { AbstractControl, ValidationErrors } from "@angular/forms";

// Custom validator used by the user form email field.
// Angular passes the current form control into this function every time the value changes.
export function mustContainCentricDomain(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    // Returning null means the control is valid.
    if (value.includes('@centric.eu')){
        return null;
    }

    // Returning an object means the control is invalid.
    // The key can be checked in the template with errors?.['mustContainCentricDomain'].
    return {
        mustContainCentricDomain: true
    };
}

// Custom validator used by the product form category field.
// It requires the text to contain the word "electronics".
export function mustContainElectronicsInName(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    // Returning null means the validation passed.
    if (value.includes('electronics')){
        return null;
    }

    // This error key is used by the template to show a specific validation message.
    return {
        mustContainElectronicsInName: true
    };
}