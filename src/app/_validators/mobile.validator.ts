import { AbstractControl, ValidationErrors } from "@angular/forms";


const invalidPhone = false;

function btw(d: string, l: number, u: number) {
    const dd = parseInt(d);
    return dd >= l && dd <= u;

}

const en = "0123456789";
const fa = "۰۱۲۳۴۵۶۷۸۹";

function toLatin(str?: string): string | undefined {
    if (!str) return undefined;
    for (let i = 0; i < fa.length; i++) {
        str = str.replace(fa[i], en[i]);
    }
    return str;
}


export function validatePhone(phone: string) {
    if (!phone) return invalidPhone;
    let phone0 = toLatin(phone) || "";

    if (phone0.startsWith("+98")) phone0 = phone0.replace("+98", "0");

    const len = phone0.length;
    if (len !== 10 && len !== 11) return invalidPhone;

    if (len === 11 && phone0[0] !== "0") return invalidPhone;

    let start = len === 11 ? 1 : 0;

    if (phone0[start] !== "9") return invalidPhone;
    start++;

    if (!btw(phone0[start], 0, 5)) return invalidPhone;

    for (let i = start + 1; i < len; i++) {
        if (!btw(phone0[i], 0, 9)) return invalidPhone;
    }
    return true;
}

export class MobileValidator {
    static mobileValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value as string;
        if (!value) return null;
        return !value || !validatePhone(value) ? { mobile: true } : null;
    }
}