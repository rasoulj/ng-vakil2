import { UserProfile } from "../models/user-profile.model";
import { stdViewPhone } from "../validators/mobile.validator";

export function removeItem(key: string): void {
    localStorage.removeItem(key);
}

export function setItem(key: string, value?: string): void {
    localStorage.setItem(key, value ?? "");
}

export function getItem(key: string, value?: string): string | null {
    return localStorage.getItem(key);
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