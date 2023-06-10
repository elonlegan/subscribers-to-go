import { Component } from '@angular/core';
import { Account } from '@app/models';
import { AccountService } from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  account: Account;

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

  logout() {
    this.accountService.logout();
  }
}
