import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5159/api/auth';

  constructor(@Inject(PLATFORM_ID) private platformId:any, private http: HttpClient) {}

  // -------------------- LOGIN --------------------
  login(credentials: { userName: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res?.accessToken) {
          localStorage.setItem('jwt', res.accessToken);
        }
      })
    );
  }

  register(data: { userName: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      tap((res: any) => {
        if (res?.accessToken) {
          localStorage.setItem('jwt', res.accessToken);
        }
      })
    );
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
  }

  isLoggedIn():boolean{
    if(isPlatformBrowser(this.platformId)){
      return !!this.getToken();
    }
    return false;
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
}
