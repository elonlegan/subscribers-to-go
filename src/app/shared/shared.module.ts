import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ConfirmDialogComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
