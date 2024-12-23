import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../../contacts/Models/loginrequest';
import { LoginResponse } from '../../contacts/Models/loginResponse';
import { environment } from '../../../../environments/environment';
import { User } from '../../contacts/Models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined);
  private userLoggedIn = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedIn.asObservable();
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("https://localhost:7034/api/auth/login", {
      email: request.email,
      password: request.password
    });
  }
  setUserLoggedIn(value: boolean): void {
    this.userLoggedIn.next(value);
  }

  isUserLoggedIn(): boolean {
    return this.userLoggedIn.value;
  }
  logout(): void {
    this.setUserLoggedIn(false);
    this.cookieService.delete('Authorization', '/');
  }
}
