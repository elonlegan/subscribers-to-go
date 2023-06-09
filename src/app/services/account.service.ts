import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/models';

const baseUrl = `${environment.apiUrl}/account`;

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(private router: Router, private http: HttpClient) {
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  login(UserName: string, Password: string) {
    return this.http
      .post<any>(
        `${baseUrl}/login`,
        { UserName, Password },
        { withCredentials: true }
      )
      .pipe(
        map((account) => {
          this.accountSubject.next(account);
          this.startRefreshTokenTimer();
          return account;
        })
      );
  }

  logout() {
    this.http
      .post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true })
      .subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  refreshToken() {
    return this.http
      .post<any>(`${baseUrl}/regenerateToken`, {}, { withCredentials: true })
      .pipe(
        map((account) => {
          this.accountSubject.next(account);
          this.startRefreshTokenTimer();
          return account;
        })
      );
  }

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.accountValue.Token.split('.')[1]));
    console.log(jwtToken);

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 600 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
