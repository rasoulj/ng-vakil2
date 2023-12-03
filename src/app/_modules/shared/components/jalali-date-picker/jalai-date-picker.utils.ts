import { Jalali } from "jalali-ts";
import { IHoliday } from "../../models/holiday.model";

export function cmpJalali(d1: Jalali, d2: Jalali): number {
    const y = d1.getFullYear() - d2.getFullYear();
    const m = d1.getMonth() - d2.getMonth();
    const d = d1.getDate() - d2.getDate();
    if (y) return y;
    if (m) return m;
    return d;
}


export function cmpDate(rd1: Date, rd2: Date): number {
    const d1 = new Date(rd1);
    const d2 = new Date(rd2);
    const y = d1.getFullYear() - d2.getFullYear();
    const m = d1.getMonth() - d2.getMonth();
    const d = d1.getDate() - d2.getDate();
    if (y) return y;
    if (m) return m;
    return d;
}

export function findHoliday(jd: Jalali, holidays: IHoliday[]): IHoliday | undefined {
    for (const hol of holidays) {
        if (cmpJalali(jd, new Jalali(new Date(hol.day))) === 0) {
            return hol;
        }
    }
    return undefined;
}


export function isOff(d: number, offDays: number[]): boolean {
    return offDays.includes(d % 7);
}

export function getSelectedHolidays(selectedDate: Date, holidays: IHoliday[]): IHoliday[] {
    return holidays.filter(h => cmpDate(h.day, selectedDate) === 0);
}
