import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
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
  MatOptionModule,
  MatToolbarModule
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
  MatOptionModule,
  MatToolbarModule
];

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY'
  }
};

@NgModule({
  imports: [modules],
  exports: [modules],
  declarations: [],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class MaterialModule {}
