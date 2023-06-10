import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '@app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddEditComponent } from './add-edit/add-edit.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [ListComponent, AddEditComponent],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
  ],
})
export class SubscribersModule {}
