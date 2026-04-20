import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { IPrestacaoServico } from '../../entities/prestacao-servico';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<IPrestacaoServico>;
export type EntityArrayResponseType = HttpResponse<IPrestacaoServico[]>;

@Injectable({
  providedIn: 'root'
})
export class PrestacaoServicoService {

  protected resourceUrl: string;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/prestacaoServico');
  }

  create(prestacao: IPrestacaoServico): Observable<EntityResponseType> {
    return this.http.post<IPrestacaoServico>(this.resourceUrl + '/save', prestacao, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrestacaoServico>(`${this.resourceUrl}/repasse/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IPrestacaoServico[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IPrestacaoServico[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(prestacao: IPrestacaoServico): Observable<EntityResponseType> {
    return this.http.put<IPrestacaoServico>(
      `${this.resourceUrl}/update`, prestacao, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
