import { Jalali } from "jalali-ts";

export interface IHoliday {
    _id: string,
    day: Date,
    type: "holiday" | "vacation" | "off",
    description: string,
}


export interface ISearchHoliday {
    data: IHoliday[],
    length: number,
}

export interface CalendarDay {
    day: number,
    date: Jalali,
    className: string,
    classNameParent: string,
    isSelected: boolean,
    isToday: boolean,
    isNormal: boolean,
    isOut: boolean,
    disabled: boolean,
    holiday: IHoliday | undefined,
    callsCount: number,
}
