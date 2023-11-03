import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL } from '../_config/consts';
import { UserProfile } from '../profile/models/user.model';


const BASE = "users/"
const AUTH = "auth";
const REFRESH_TOKEN = "refreshToken";
const OTP = "otp";

const ACCESS_TOKEN = "accessToken";
const USER_KEY = 'auth-user';

function getUrl(ep: string): string {
  return `${BASE_URL}${BASE}${ep}`;
}

function removeItem(key: string): void {
  localStorage.removeItem(key);
}

function setItem(key: string, value?: string): void {
  localStorage.setItem(key, value ?? "");
}

function getItem(key: string, value?: string): string | null {
  return localStorage.getItem(key);
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isLogged(): boolean {
    return !!this.getToken();
  }

  private loggedUser$$ = new BehaviorSubject<UserProfile | undefined>(undefined);
  public loggedUser$ = this.loggedUser$$.asObservable();

  //Phone used in signin duration
  public phone?: string;

  constructor(private http: HttpClient) {
    this.setLogged(this.getUser());
  }

  createOtp(phone: string): Observable<any> {
    this.phone = phone;
    return this.http.post(getUrl(OTP), { phone });
  }

  reSendOtp(): Observable<any> {
    return this.http.post(getUrl(OTP), { phone: this.phone });
  }

  public saveUser(user: UserProfile) {

    removeItem(ACCESS_TOKEN);
    setItem(ACCESS_TOKEN, user.accessToken || '');

    removeItem(REFRESH_TOKEN);
    setItem(REFRESH_TOKEN, user.refreshToken || '');

    removeItem(USER_KEY);
    setItem(USER_KEY, JSON.stringify(user));

    this.setLogged(user);
  }

  public getUser(): UserProfile | undefined {
    const user = getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return undefined;
  }

  public getToken(): string | null {
    return getItem(ACCESS_TOKEN);
  }

  public getRefreshToken(): string | null {
    return getItem(REFRESH_TOKEN);
  }

  checkOtp(otp: string): Observable<UserProfile> {
    return (this.http.post(getUrl(AUTH), { phone: this.phone, otp }) as Observable<UserProfile>);
  }

  checkPassword(password: string): Observable<UserProfile> {
    return (this.http.post(getUrl(AUTH), { phone: this.phone, password }) as Observable<UserProfile>);
  }

  refreshToken(): Observable<UserProfile> {
    const phone = this.getUser()?.phone;

    const refreshToken = this.getRefreshToken();
    return (this.http.post(getUrl(REFRESH_TOKEN), { phone, refreshToken }) as Observable<UserProfile>);
  }



  logout(): void {
    removeItem(ACCESS_TOKEN);
    removeItem(REFRESH_TOKEN);
    removeItem(USER_KEY);
    this.setLogged(undefined);
  }

  private setLogged(user: UserProfile | undefined): void {
    this.loggedUser$$.next(user);
  }
}
