import { Component } from '@angular/core';
import { SubscriberList } from '@app/models';
import { SubscribersService } from '@app/services/subscribers.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  subscriberList: SubscriberList;
  displayedColumns: string[] = [
    'PublicId',
    'Name',
    'Email',
    'CountryName',
    'PhoneCodeAndNumber',
    'SubscriptionStateDescription',
  ];
  dataSource = [];

  constructor(private subscribersService: SubscribersService) {}

  ngOnInit() {
    this.subscribersService
      .get()
      .pipe(first())
      .subscribe((subscriberList) => {
        this.subscriberList = subscriberList;
        console.log(this.subscriberList);

        this.dataSource = subscriberList.Data;
      });
  }
}
