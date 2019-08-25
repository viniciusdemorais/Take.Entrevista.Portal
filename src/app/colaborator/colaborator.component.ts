import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Colaborador } from '@app/models/Colaborador';
import { AreaService } from '@app/services/area.service';
import { Area } from '@app/models/Area';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CidadeService } from '@app/services/cidade.service';
import { Cidade } from '@app/models/Cidade';
import { ColaboradorService } from '@app/services/colaborador.service';

@Component({
  selector: 'app-colaborator',
  templateUrl: './colaborator.component.html',
  styleUrls: ['./colaborator.component.scss']
})
export class ColaboratorComponent implements OnInit, OnDestroy {
  unsub = new Subject();
  personForm: FormGroup;

  loadingArea = false;
  loadingCidade = false;
  loadingColaborador = false;

  titleForm: string;
  textForm: string;
  textBtnForm: string;

  displayedColumns = ['nome', 'email', 'area', 'cidade', 'actions'];

  areas: Area[] = [];
  cidades: Cidade[] = [];
  colaboradores: Colaborador[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ngxSmartModalService: NgxSmartModalService,
    private areaService: AreaService,
    private cidadeService: CidadeService,
    private colaboradorService: ColaboradorService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getAreas();
    this.getCidades();
    this.getColaboradores();
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.unsubscribe();
  }

  getAreas() {
    this.loadingArea = true;
    this.areaService
      .retrieveAreas()
      .pipe(
        takeUntil(this.unsub),
        finalize(() => {
          this.loadingArea = false;
        })
      )
      .subscribe(
        res => {
          this.areas = res.list;
        },
        err => {}
      );
  }

  getCidades() {
    this.loadingCidade = true;
    this.cidadeService
      .retrieveCidades()
      .pipe(
        takeUntil(this.unsub),
        finalize(() => {
          this.loadingCidade = false;
        })
      )
      .subscribe(
        res => {
          this.cidades = res.list;
        },
        err => {}
      );
  }

  getColaboradores() {
    this.loadingColaborador = true;
    this.colaboradorService
      .retrieveColaboradores()
      .pipe(
        takeUntil(this.unsub),
        finalize(() => {
          this.loadingColaborador = false;
        })
      )
      .subscribe(
        res => {
          this.colaboradores = res.list;
        },
        err => {}
      );
  }

  createForm() {
    this.personForm = this.formBuilder.group({
      idColaborador: [null],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      idArea: [null, Validators.required],
      idCidade: [null, Validators.required],
      workChatId: [null, Validators.required]
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
