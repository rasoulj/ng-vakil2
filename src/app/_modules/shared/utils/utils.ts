export function removeItem(key: string): void {
    localStorage.removeItem(key);
}

export function setItem(key: string, value?: string): void {
    localStorage.setItem(key, value ?? "");
}

export function getItem(key: string, value?: string): string | null {
    return localStorage.getItem(key);
}