import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ConfirmDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
