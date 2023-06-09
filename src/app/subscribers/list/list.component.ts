import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscriber, SubscriberList } from '@app/models';
import { SubscribersService } from '@app/services/subscribers.service';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { debounceTime, first } from 'rxjs/operators';

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
    'Area',
    'CountryName',
    'PhoneCodeAndNumber',
    'SubscriptionStateDescription',
    'Actions',
  ];
  dataSource: MatTableDataSource<Subscriber>;
  loading: boolean = true;

  searchText: string = '';
  pageIndex: number = 0;
  pageSize: number = 10;

  @ViewChild(MatSort) sort: MatSort;
  sortTypes = {
    asc: 0,
    desc: 1,
    DEFAULT: 0,
  };

  constructor(
    private subscribersService: SubscribersService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscribersService
      .get()
      .pipe(first())
      .subscribe((subscriberList: SubscriberList) => {
        this.setData(subscriberList);
      });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.resetPaginator();
      this.getFilteredData();
    });
  }

  setData(subscriberList: SubscriberList) {
    this.subscriberList = subscriberList;

    this.dataSource = new MatTableDataSource<Subscriber>(subscriberList.Data);
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  resetPaginator() {
    this.pageIndex = 0;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getFilteredData();
  }

  onSearchChange() {
    this.resetPaginator();
    this.getFilteredData();
  }

  getFilteredData() {
    this.dataSource = new MatTableDataSource();
    this.loading = true;

    this.subscribersService
      .get({
        criteria: this.searchText,
        page: this.pageIndex + 1,
        count: this.pageSize,
        sortOrder: this.sort.active || this.displayedColumns[0],
        sortType:
          this.sortTypes[this.sort.direction] || this.sortTypes['DEFAULT'],
      })
      .pipe(first())
      .subscribe((filteredData: SubscriberList) => {
        this.setData(filteredData);
      });
  }

  deleteAccount(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const subscriber = this.subscriberList.Data.find(
          (subscriber) => subscriber.Id === id
        );
        subscriber.isDeleting = true;
        this.subscribersService
          .delete(id)
          .pipe(first())
          .subscribe(() => {
            this.subscriberList.Count--;
            this.subscriberList.Data = this.subscriberList.Data.filter(
              (subscriber) => subscriber.Id !== id
            );
            this.setData(this.subscriberList);
          });
      }
    });
  }
}
