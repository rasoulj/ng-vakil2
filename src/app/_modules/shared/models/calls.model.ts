import { Jalali } from "jalali-ts";
import { DailySchedule, UserProfile } from "./user-profile.model";
import { Observable } from "rxjs";

export interface ICalls {
    _id?: string,
    userId: Partial<UserProfile>,
    responderId: Partial<UserProfile>,
    date: Date,
    timeSlot: number,
    duration: number,
    expertiseId: number,
    status: 'empty' | 'init' | 'paid' | 'inProgress' | 'completed' | 'canceled' | 'disabled',
}

export interface ISearchCalls {
    data: ICalls[],
    length: number,
}


export function geEmptyCall(date: Date, timeSlot: number): ICalls {
    return {
        userId: {},
        responderId: {},
        date,
        timeSlot,
        duration: 30,
        expertiseId: 0,
        status: 'init',
    }
}

export function zeroPad(num: number): string {
    if (num < 10) return `0${num}`;
    else return num.toString();
}

export function formatLabel(value: number): string {
    const hour = Math.floor(value / 2);
    const minute = (value % 2) * 30;
    return `${zeroPad(hour)}:${zeroPad(minute)}`;
}


export function getCallLabel(call: ICalls): string {
    return formatLabel(call.timeSlot) + " - " + formatLabel(call.timeSlot + 1);
}


export interface ICallUI {
    title: string,
    disabled: boolean,
    call?: ICalls,
    timeSlot: number,
}

export function isResponder(call: ICalls | undefined, loggedUserId: string | undefined): boolean {
    return (!!call?.responderId) && call?.responderId._id === loggedUserId;
}

export function itsMe(call: ICalls | undefined, loggedUserId: string | undefined): boolean {
    return !call?.userId || (!!call?.userId) && call?.userId._id === loggedUserId;
}

export function isSelfie(call: ICalls): boolean {
    if (!call) return false;
    return call.userId._id === call.responderId._id;
}

export function nextFriday(n?: number): Date {
    let d = new Jalali();
    const day = (d.date.getDay() + 1) % 7;
    let daysToFriday = 6 - day;
    if (daysToFriday === 0) daysToFriday = 7;

    if (!n || n <= 0) n = 1;
    const daysToEnd = daysToFriday + (n - 1) * 7;
    d.add(daysToEnd, 'day');
    return d.date;
}

export function filterCallsOfDate(date: Date, calls: ICalls[]): ICalls[] {
    const dd = new Jalali(date);
    const day = dd.getDate();
    const month = dd.getMonth();

    return calls.filter(p => {
        const jd = new Jalali(new Date(p.date));
        return jd.getDate() === day && jd.getMonth() === month;
    });
}