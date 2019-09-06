import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Area } from '@app/models/Area';
import { Cidade } from '@app/models/Cidade';
import { AreaService } from '@app/services/area.service';
import { Candidato } from '@app/models/Candidato';
import { CidadeService } from '@app/services/cidade.service';
import { CandidatoService } from '@app/services/candidato.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { AgendamentoService } from '@app/services/agendamento.service';
import { Agendamento } from '@app/models/Agendamento';
import { Colaborador } from '@app/models/Colaborador';
import { ColaboradorService } from '@app/services/colaborador.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit, OnDestroy {
  unsub = new Subject();
  candidateForm: FormGroup;
  schedulingForm: FormGroup;

  // datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  hourMask = [/\d/, /\d/, ':', /\d/, /\d/];

  loadingArea = false;
  loadingCidade = false;
  loadingCandidato = false;
  loadingAgendamento = false;
  loadingColaboradoresRh = false;

  titleForm: string;
  textForm: string;

  displayedColumns = ['nome', 'area', 'cidade', 'actions'];

  areas: Area[] = [];
  cidades: Cidade[] = [];
  candidatos: Candidato[] = [];
  colaboradoresRh: Colaborador[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ngxSmartModalService: NgxSmartModalService,
    private areaService: AreaService,
    private cidadeService: CidadeService,
    private candidatoService: CandidatoService,
    private agendamentoService: AgendamentoService,
    private colaboradorService: ColaboradorService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getAreas();
    this.getCidades();
    this.getCandidatos();
    this.getColaboradoresRh();
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

  getNameArea(id: number): string {
    if (this.areas.length > 0) {
      return this.areas.find(a => a.idArea === id).nome;
    }
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

  getNameCidade(id: number): string {
    if (this.cidades.length > 0) {
      return this.cidades.find(c => c.idCidade === id).nome;
    }
  }

  getCandidatos() {
    this.loadingCandidato = true;
    this.candidatoService
      .retrieveCandidatos()
      .pipe(
        takeUntil(this.unsub),
        finalize(() => {
          this.loadingCandidato = false;
        })
      )
      .subscribe(
        res => {
          this.candidatos = res.list;
        },
        err => {}
      );
  }

  getColaboradoresRh() {
    this.loadingColaboradoresRh = true;
    this.colaboradorService
      .retrieveColaboradoresRh()
      .pipe(
        takeUntil(this.unsub),
        finalize(() => {
          this.loadingColaboradoresRh = false;
        })
      )
      .subscribe(
        res => {
          this.colaboradoresRh = res.list;
        },
        err => {}
      );
  }

  createForm() {
    this.candidateForm = this.formBuilder.group({
      idCandidato: [0, Validators.required],
      idCidade: [null, Validators.required],
      idArea: [null, Validators.required],
      nome: [null, Validators.required],
      dataEntrevista: [null, Validators.required],
      horario: [null, Validators.required]
    });

    this.schedulingForm = this.formBuilder.group({
      idAgendamento: [null, Validators.required],
      idCandidato: [, Validators.required],
      responsavelRh: [, Validators.required],
      qtdColaborador: [, Validators.required]
    });
  }

  resetForm() {
    this.candidateForm.reset();
    Object.keys(this.candidateForm.controls).forEach(key => {
      this.candidateForm.controls[key].setErrors(null);
    });

    this.schedulingForm.reset();
    Object.keys(this.schedulingForm.controls).forEach(key => {
      this.schedulingForm.controls[key].setErrors(null);
    });
  }

  fillForm(data: Candidato) {
    Object.keys(this.candidateForm.controls).forEach(key => {
      if (this.candidateForm.controls[key]) {
        if (key === 'dataEntrevista') {
          this.candidateForm.controls[key].patchValue(formatDate(data[key], 'yyyy-MM-dd', 'pt-BR'));
        } else {
          this.candidateForm.controls[key].patchValue(data[key]);
        }
      }
    });

    Object.keys(this.schedulingForm.controls).forEach(key => {
      if (this.schedulingForm.controls[key]) {
        this.schedulingForm.controls[key].patchValue(data[key]);
      }
    });
  }

  saveCandidato() {
    if (this.candidateForm.invalid) {
    } else {
      const data: Candidato = this.candidateForm.value;
      this.loadingCandidato = true;
      this.candidatoService
        .saveCandidato(data)
        .pipe(
          takeUntil(this.unsub),
          finalize(() => {
            this.loadingCandidato = false;
          })
        )
        .subscribe(
          res => {
            this.resetForm();
            this.ngxSmartModalService.getModal('myModal').close();
            this.getCandidatos();
          },
          err => {}
        );
    }
  }

  addCandidate() {
    this.candidateForm.controls.idCandidato.patchValue(0);
    this.titleForm = 'Adicionar Candidato';
    this.textForm = 'Cadastre os candidatos que irão participar da entrevista.';
    this.ngxSmartModalService.getModal('myModal').open();
  }

  editCandidato(id: number) {
    this.titleForm = 'Editar Candidato';
    this.textForm = 'Edite o Candidato que irá participar da entrevista.';
    const data: Candidato = this.candidatos.find(c => c.idCandidato === id);
    this.fillForm(data);
    this.ngxSmartModalService.getModal('myModal').open();
  }

  deleteCandidato(id: number) {
    this.loadingCandidato = true;
    this.candidatoService
      .deleteCandidato(id)
      .pipe(
        takeUntil(this.unsub),
        finalize(() => {
          this.loadingCandidato = false;
        })
      )
      .subscribe(
        res => {
          this.getCandidatos();
        },
        err => {}
      );
  }

  addSchedule() {
    this.schedulingForm.controls.idAgendamento.patchValue(0);
    this.titleForm = 'Marcar Entrevista';
    this.textForm = 'Marque suas entrevistas para os Take.Seres receberem a mensagem de confirmação no WorkChat.';
    this.ngxSmartModalService.getModal('schedulingModal').open();
  }

  saveSchedule() {
    if (this.schedulingForm.invalid) {
    } else {
      const data: Agendamento = this.schedulingForm.value;
      this.loadingAgendamento = true;
      this.agendamentoService
        .saveAgendamento(data)
        .pipe(
          takeUntil(this.unsub),
          finalize(() => {
            this.loadingAgendamento = false;
          })
        )
        .subscribe(
          res => {
            this.resetForm();
            this.ngxSmartModalService.getModal('schedulingModal').close();
          },
          err => {}
        );
    }
  }
}
