import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContrato } from '../../entities/contrato';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { IContratoParcela } from '../../entities/contrato-parcelas';

export type EntityResponseType = HttpResponse<IContratoParcela>;
export type EntityArrayResponseType = HttpResponse<IContratoParcela[]>;

@Injectable({
  providedIn: 'root'
})
export class ContratoParcelaService {
  protected resourceUrl: string;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/contratoParcela');
  }

  create(contrato: IContratoParcela): Observable<EntityResponseType> {
    return this.http.post<IContratoParcela>(this.resourceUrl + '/save', contrato, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContratoParcela>(`${this.resourceUrl}/findById/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IContratoParcela[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IContratoParcela[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  searchByNumeroContrato(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IContratoParcela[]>(`${this.resourceUrl}/searchByNumeroContrato?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(contrato: IContratoParcela): Observable<EntityResponseType> {
    return this.http.put<IContratoParcela>(
      `${this.resourceUrl}/update`, contrato, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
