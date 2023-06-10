import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '@app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SubscribersModule {}
