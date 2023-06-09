import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
