import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../_model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  redirectOnLoggedOut(): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

  public isLoggedIn(): boolean {
    return (window.localStorage.getItem('token') !== null);
  }

  public getToken(): string {
    return window.localStorage.getItem('token');
  }

  public login(user: User): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8081/login', user, {observe: 'response'});
  }

  public logoutAndRedirect(): void {
    this.logout();
    this.router.navigateByUrl('/login');
  }

  public logout(): void {
    window.localStorage.removeItem('token');
  }

  public register(user: User): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:8081/users/sign-up', user, {observe: 'response'})
      ;
  }
}
