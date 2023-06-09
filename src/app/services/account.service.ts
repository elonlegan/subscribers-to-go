import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/models';

const baseUrl = `${environment.apiUrl}/account`;
const accountKey = 'account';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(private router: Router, private http: HttpClient) {
    this.accountSubject = new BehaviorSubject<Account>(
      this.getAccountFromLocalStorage()
    );
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
          this.setAccountToLocalStorage(account);
          this.accountSubject.next(account);
          this.startRefreshTokenTimer();
          return account;
        })
      );
  }

  logout() {
    this.http
      .post<any>(`${baseUrl}/logout`, {}, { withCredentials: true })
      .subscribe();
    this.stopRefreshTokenTimer();
    this.removeAccountFromLocalStorage();
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  refreshToken() {
    let headers = new HttpHeaders({
      Authorization: `RefreshToken ${this.accountValue?.RefreshToken}`,
    });
    let options = { withCredentials: true, headers: headers };
    return this.http.post<any>(`${baseUrl}/regenerateToken`, {}, options).pipe(
      map((account) => {
        if (account.Status) {
          this.setAccountToLocalStorage(account);
          this.accountSubject.next(account);
          this.startRefreshTokenTimer();
          return account;
        } else {
          this.logout();
        }
      })
    );
  }

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.accountValue.Token?.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  private getAccountFromLocalStorage(): Account {
    const accountJson = localStorage.getItem(accountKey);
    return accountJson ? JSON.parse(accountJson) : null;
  }

  private setAccountToLocalStorage(account: Account) {
    localStorage.setItem(accountKey, JSON.stringify(account));
  }

  private removeAccountFromLocalStorage() {
    localStorage.removeItem(accountKey);
  }
}
