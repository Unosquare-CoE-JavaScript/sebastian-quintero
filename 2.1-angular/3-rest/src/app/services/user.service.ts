import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreatableUser, User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiBaseUrl}/api/v1/users`;

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<User[]>(this.baseUrl);
  }

  createOne(data: CreatableUser) {
    return this.http.post<User>(this.baseUrl, data);
  }
}
