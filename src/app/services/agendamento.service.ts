import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from '@app/models/Agendamento';

@Injectable()
export class AgendamentoService {
  constructor(private http: HttpClient) {}

  retrieveAgendamentos(): Observable<any> {
    return this.http.request<any>('get', `Agendamento`).pipe(map(resp => resp));
  }

  saveAgendamento(data: Agendamento): Observable<any> {
    return this.http.request<any>('post', `Agendamento`, { body: data }).pipe(map(resp => resp));
  }
}
