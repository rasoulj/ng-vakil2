import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { BASE_URL } from '../config/consts';
import { UserProfile, UserRole, UserRoles } from '../models/user-profile.model';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { MobileValidator, normalizePhone, stdViewPhone, toLatin } from '../validators/mobile.validator';
import { removeItem, setItem, getItem, getDisplayName } from '../utils/utils';

const BASE = "users/"
const AUTH = "auth";
const REFRESH_TOKEN = "refreshToken";
const OTP = "otp";

const ACCESS_TOKEN = "accessToken";
const USER_KEY = 'auth-user';

function getUrl(ep: string): string {
  return `${BASE_URL}${BASE}${ep}`;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  get isLogged(): boolean {
    return !!this.getToken();
  }

  get role(): UserRole {
    return this.getUser()?.role;
  }

  get isLawyer(): boolean {
    return this.role === UserRoles.lawyer;
  }

  get isInitLawyer(): boolean {
    return this.role === UserRoles.initLawyer;
  }

  get isInit(): boolean {
    return this.role === UserRoles.init;
  }

  get isManager(): boolean {
    return this.role === UserRoles.manager;
  }

  get isAdmin(): boolean {
    return this.role === UserRoles.admin;
  }

  get isCustomer(): boolean {
    return this.role === UserRoles.customer;
  }

  private loggedUser$$ = new BehaviorSubject<UserProfile | undefined>(undefined);
  public loggedUser$ = this.loggedUser$$.asObservable();

  //Phone used in signin duration
  public phone?: string;

  constructor(private http: HttpClient) {
    this.setLogged(this.getUser());
  }


  get displayName(): string | undefined {
    return getDisplayName(this.getUser());
  }

  createOtp(phone: string): Observable<any> {
    this.phone = phone;
    return this.http.post(getUrl(OTP), { phone: normalizePhone(phone) });
  }

  reSendOtp(): Observable<any> {
    return this.http.post(getUrl(OTP), { phone: normalizePhone(this.phone ?? "") ?? "" });
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
    return (this.http.post(getUrl(AUTH), { phone: normalizePhone(this.phone ?? ""), otp: toLatin(otp) }) as Observable<UserProfile>);
  }

  checkPassword(password: string): Observable<UserProfile> {
    return (this.http.post(getUrl(AUTH), { phone: normalizePhone(this.phone ?? ""), password }) as Observable<UserProfile>);
  }

  refreshToken(): Observable<UserProfile> {
    const phone = normalizePhone(this.getUser()?.phone ?? "");

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

  public getUserByMobile(mobile: string): Observable<boolean> {
    const nPhone = normalizePhone(mobile);

    if (!nPhone) return of(false);

    const ep = getUrl(nPhone);

    return this.http.get(ep) as Observable<boolean>
  }

  public mobileExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const mv = MobileValidator.mobileValidator(control);
      if (!!mv) {
        return of(mv);
      }

      return this.getUserByMobile(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return res ? { mobileExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  }


  setUser(data: Partial<UserProfile>): Observable<any> {
    const { _id } = this.getUser() || {};
    if (!_id) return of({});
    const url = `${BASE_URL}users`;
    return this.http.put(url, {
      _id,
      ...data,
    }).pipe(
      tap((value) => {
        const user = this.getUser();
        if (user) {
          this.saveUser({ ...user, ...data });
        }
      })
    );
  }
}
