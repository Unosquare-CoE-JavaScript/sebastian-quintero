import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../model/auth.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/api/v1/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.baseUrl}/login/`, { email, password });
  }

  profile(token: string) {
    return this.http.get<User>(`${this.baseUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
