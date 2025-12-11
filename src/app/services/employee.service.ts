import { inject, Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getEmployee(userName:string):Observable<Employee> {
    const url = `${this.baseUrl}user?userName=${encodeURIComponent(userName)}`;
    return this.http
      .get<Employee>(url)
      .pipe(catchError(err => this.handleError(err)));
  }

  updateEmployee(request: Employee):Observable<Employee> {
    const url = `${this.baseUrl}user`;

    var req = {
      "userName": "system",
      "email": request.email,
      "displayName": request.fullName,
      "joiningDate": "2025-12-11T11:00:41.720Z",
      "isActive": true,
      "totalPoints": 100,
      "role": [
        "SDE"
      ]
    };
    return this.http
      .put<Employee>(url, req)
      .pipe(catchError(err => this.handleError(err)));
  }
  private handleError(error: HttpErrorResponse) {
    console.error('[UserService Error]', error);

    return throwError(() => ({
      status: error.status,
      message:
        error.error?.message ??
        error.statusText ??
        'An unexpected server error occurred.',
      details: error.error
    }));
  }
}
