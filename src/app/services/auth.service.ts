import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5159/api/auth';

  constructor(private http: HttpClient) {}

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

  // -------------------- REGISTER --------------------
  register(data: { name: string; email: string; password: string }): Observable<any> {
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

  logout() {
    localStorage.removeItem('jwt');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
}
