const A_MIN = 60000;
const ONLINE_PERIOD = 8;

import { stdViewPhone } from "../validators/mobile.validator";

export type UserRole = "init" | "admin" | "manager" | "lawyer" | "customer" | undefined;

export const UserRoles = {
    none: "none",

    init: "init",
    initLawyer: "initLawyer",

    admin: "admin",
    manager: "manager",
    lawyer: "lawyer",
    customer: "customer",
}

export enum LawyerTypeEnum {
    na = 0,
    lawyer = 1,
    lawyerStudent = 2,
}

export enum GenderEnum {
    na = 0,
    male = 1,
    female = 2,
}

export enum GraduationTypeEnum {
    na = 0,
    bachelor = 1,
    master = 2,
    phd = 3,
}

export interface EventType {
    target: {
        name: string
        value: any
    }
}

export interface UserProfile {
    _id?: string,
    //Common Properties
    phone: string
    password?: string
    firstName?: string
    lastName?: string
    role: UserRole
    provinceId: number,
    cityId: number,
    email?: string,
    gender: GenderEnum,
    lastSeen: Date,
    avatar?: string | null,

    // Lawyer specific properties
    lawyerDocId?: string
    age: number
    expertise1: number
    expertise2: number
    lawyerType: LawyerTypeEnum
    graduationType: GraduationTypeEnum,
    address?: string
    bio?: string,

    accessToken?: string,
    refreshToken?: string,
}

export function getDisplayName(user?: { firstName?: string, lastName?: string, phone?: string }): string | undefined {
    if (!user) return undefined;
    const fn = `${user.firstName} ${user.lastName}`;
    if (fn === ' ') {
        return stdViewPhone(user.phone);
    } else {
        return fn;
    }
}

function lastOnlineInMinutes(user?: Partial<UserProfile>): number {
    if (!user || !user.lastSeen) {
        return 100000;
    }

    return (new Date().getTime() - new Date(user.lastSeen).getTime()) / A_MIN;

}

export function isOnlineUser(user?: Partial<UserProfile>): boolean {
    if (!user || !user.lastSeen) {
        return false;
    }

    return lastOnlineInMinutes(user) < ONLINE_PERIOD;
}