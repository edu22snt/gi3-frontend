import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { IVendedor } from '../../entities/vendedor';
import { environment } from '../../core/environments/environment';

export type EntityResponseType = HttpResponse<IVendedor>;
export type EntityArrayResponseType = HttpResponse<IVendedor[]>;

@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/vendedor');
  }

  create(vendedor: IVendedor): Observable<EntityResponseType> {
    return this.http.post<IVendedor>(this.domain + this.resourceUrl + '/save', vendedor, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVendedor>(`${this.domain}${this.resourceUrl}/findById/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IVendedor[]>(`${this.domain}${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IVendedor[]>(`${this.domain}${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(vendedor: IVendedor): Observable<EntityResponseType> {
    return this.http.put<IVendedor>(
      `${this.domain}${this.resourceUrl}/update`, vendedor, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.domain}${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
