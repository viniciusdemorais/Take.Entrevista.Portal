import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatIconModule,
  MatFormFieldModule,
  MatMenuModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule
} from '@angular/material';

const modules = [
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatIconModule,
  MatFormFieldModule,
  MatMenuModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule
];

@NgModule({
  imports: [modules],
  exports: [modules],
  declarations: []
})
export class MaterialModule {}
