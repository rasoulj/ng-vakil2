import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';  // for Spring Boot back-end
// const TOKEN_HEADER_KEY = 'x-access-token';    // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.authService.getToken();
        if (token != null) {
            authReq = this.addTokenHeader(req, token);
        }

        return next.handle(authReq).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    !req.url.includes('auth/signin') &&
                    error.status === 401
                ) {
                    return this.handle401Error(req, next);
                }

                return throwError(() => error);
            })
        ) as Observable<HttpEvent<any>>;
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            if (this.authService.isLogged) {
                return this.authService.refreshToken().pipe(
                    //tap(),
                    switchMap(user => {
                        this.isRefreshing = false;
                        this.authService.saveUser(user);
                        let authReq = request;
                        const token = this.authService.getToken();
                        if (token != null) {
                            authReq = this.addTokenHeader(request, token);
                        }
                        return next.handle(authReq);
                    }),
                    catchError((error) => {
                        this.isRefreshing = false;

                        if (error.status == '403') {
                            this.authService.logout();
                        }

                        return throwError(() => error);
                    })
                );
            }
        }

        return next.handle(request);
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        /* for Spring Boot back-end */
        return request.clone({
            headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
        })

        // console.log({ headers:  })
        // return request.clone({ headers: { TOKEN_HEADER_KEY: 'Bearer ' + token } });

        /* for Node.js Express back-end */
        // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];