import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { IPrestacaoServico } from '../../entities/prestacao-servico';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';

export type EntityResponseType = HttpResponse<IPrestacaoServico>;
export type EntityArrayResponseType = HttpResponse<IPrestacaoServico[]>;

@Injectable({
  providedIn: 'root'
})
export class PrestacaoServicoService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/prestacaoServico');
  }

  create(prestacao: IPrestacaoServico): Observable<EntityResponseType> {
    return this.http.post<IPrestacaoServico>(this.domain + this.resourceUrl + '/save', prestacao, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrestacaoServico>(`${this.domain}${this.resourceUrl}/repasse/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IPrestacaoServico[]>(`${this.domain}${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IPrestacaoServico[]>(
      `${this.domain}${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(prestacao: IPrestacaoServico): Observable<EntityResponseType> {
    return this.http.put<IPrestacaoServico>(
      `${this.domain}${this.resourceUrl}/update`, prestacao, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.domain}${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
