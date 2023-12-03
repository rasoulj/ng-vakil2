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


const SAT = '48.75%';
const LUM = '53.333%';
export function stringToHslColor(str?: string): string {
    const text = (str ?? "AA").trim();
    let hash = 0; //..reduce((s, i) => i + ((s << 5) - s));
    for (let i of text) {
        hash = i.charCodeAt(0) + ((hash << 5) - hash);
    }
    var h = hash % 360;
    return `hsl(${1.0 * h}, ${SAT}, ${LUM})`;
}