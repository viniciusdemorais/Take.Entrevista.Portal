import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Candidato } from '@app/models/Candidato';

@Injectable()
export class CandidatoService {
  constructor(private http: HttpClient) {}

  retrieveCandidatos(): Observable<any> {
    return this.http.request<any>('get', `Candidato`).pipe(map(resp => resp));
  }

  saveCandidato(data: Candidato): Observable<any> {
    return this.http.request<any>('post', `Candidato`, { body: data }).pipe(map(resp => resp));
  }

  deleteCandidato(id: number): Observable<any> {
    return this.http.request<any>('delete', `Candidato/${id}`).pipe(map(resp => resp));
  }
}
