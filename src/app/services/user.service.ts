import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(PLATFORM_ID) private platformId:any, private http: HttpClient) { }

  private baseUrl = environment.apiUrl;

  GetUserByUserName():Observable<any>{
    return this.http.get(`${this.baseUrl}/users/user`,)
  }
}
