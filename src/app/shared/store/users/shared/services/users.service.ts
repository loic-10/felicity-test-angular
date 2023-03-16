import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, Subscription, Login, Register } from '../../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(`/api/users`);
  }

  public findOne(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  public getProfile(): Observable<User> {
    return this.http.get<User>(`/api/users/profile`);
  }

  public findAllSubscriptions(id: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`/api/users/${id}/subscriptions`);
  }

  public login(login: Login): Observable<User> {
    return this.http.post<User>(`/api/users/login`, login);
  }

  public register(register: Register): Observable<User> {
    return this.http.post<User>(`/api/users/register`, register);
  }
}
