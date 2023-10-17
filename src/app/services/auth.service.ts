import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged$$ = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.isLogged$$.asObservable();



  constructor() {
    this.setLogged(this.isLogged);
  }


  logout(): void {
    localStorage.removeItem('token');
    this.setLogged(false);
  }

  login(): void {
    localStorage.setItem('token', 'token');
    this.setLogged(true);
  }

  get isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }

  private setLogged(isLogged: boolean): void {
    this.isLogged$$.next(isLogged);
  }
}
