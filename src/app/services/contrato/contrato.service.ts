import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContrato } from '../../entities/contrato';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<IContrato>;
export type EntityArrayResponseType = HttpResponse<IContrato[]>;

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  protected resourceUrl: string;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/contrato');
  }

  create(contrato: IContrato): Observable<EntityResponseType> {
    return this.http.post<IContrato>(this.resourceUrl + '/save', contrato, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContrato>(`${this.resourceUrl}/findById/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IContrato[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IContrato[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(contrato: IContrato): Observable<EntityResponseType> {
    return this.http.put<IContrato>(
      `${this.resourceUrl}/update`, contrato, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
