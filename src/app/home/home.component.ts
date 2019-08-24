import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  personForm: FormGroup;

  titleForm: string;
  textForm: string;
  textBtnForm: string;

  displayedColumns = ['name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'actions'];

  dataSource: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
  ];

  constructor(private formBuilder: FormBuilder, public ngxSmartModalService: NgxSmartModalService) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.personForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  openDialog() {
    this.ngxSmartModalService.getModal('myModal').open();
  }

  addPerson() {
    this.titleForm = 'Adicionar Take.Ser';
    this.textForm = 'Cadastre os possíveis Take.Seres que podem ser participantes da entrevista.';
    this.textBtnForm = 'Salvar';
    this.ngxSmartModalService.getModal('myModal').open();
  }
}
