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

export function limitDots(p?: string | null, limit?: number): string {
    if (!p) return '';
    const len = limit ?? 25;
    const text = p.trim().replace(/(\r\n|\n|\r)/gm, "");
    if (text.length <= len) return text;
    return text.substring(0, len) + '...';

}