import { inject, Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  // private mockEmployee: Employee = {
  //   id: "EMP123",
  //   fullName: "Abhishek Varshney",
  //   email: "abhishek@example.com",
  //   phone: "+91 9876543210",
  //   role: "Software Developer",
  //   department: "Engineering",
  //   points: 2890,
  //   profilePicUrl: "profile.png"
  // };

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getEmployee(userName:string):Observable<Employee> {
    const url = `${this.baseUrl}/api/users?userName=${encodeURIComponent(userName)}`;
    return this.http
      .get<Employee>(url)
      .pipe(catchError(err => this.handleError(err)));
  }

  updateEmployee(request: Employee):Observable<Employee> {
    const url = `${this.baseUrl}/api/users/updateDetails`;

    return this.http
      .put<Employee>(url, request)
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
