import { AbstractControl, ValidationErrors } from "@angular/forms";


const invalidPhone = false;

function btw(d: string, l: number, u: number) {
    const dd = parseInt(d);
    return dd >= l && dd <= u;

}

const en = "0123456789";
const fa = "۰۱۲۳۴۵۶۷۸۹";

export function toLatin(str?: string): string | undefined {
    if (!str) return undefined;
    for (let i = 0; i < fa.length; i++) {
        str = str.replaceAll(fa[i], en[i]);
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

export function stdViewPhone(phone?: string) {
    if (!phone || phone.length <= 10) return phone;

    if (phone.startsWith("+98")) phone = phone.replaceAll("+98", "0");
    return phone;
}

export function normalizePhone(phone: string): string | undefined {
    //if (!!validatePhone(phone)) return undefined;


    const len = phone.length;

    if (len === 13) return toLatin(phone);

    let start = len === 11 ? 1 : 0;

    return `+98${toLatin(phone)?.substring(start)}`;
}

export class MobileValidator {
    static mobileValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value as string;
        if (!value) return null;
        return !value || !validatePhone(value) ? { mobile: true } : null;
    }
}