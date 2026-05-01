import { Injectable } from '@angular/core';
import { IRepasseBancorbras } from '../../entities/repasse-bancorbras';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { environment } from '../../core/environments/environment';

export type EntityResponseType = HttpResponse<IRepasseBancorbras>;
export type EntityArrayResponseType = HttpResponse<IRepasseBancorbras[]>;

@Injectable({
  providedIn: 'root'
})
export class RepasseBancorbrasService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/repasse');
  }

  create(repasse: IRepasseBancorbras): Observable<EntityResponseType> {
    return this.http.post<IRepasseBancorbras>(this.domain + this.resourceUrl + '/saveBancorbras', repasse, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepasseBancorbras>(`${this.domain}${this.resourceUrl}/repasseBancorbras/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IRepasseBancorbras[]>(`${this.domain}${this.resourceUrl}/findAllBancorbras?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IRepasseBancorbras[]>(
      `${this.domain}${this.resourceUrl}/searchByKeywordBancorbras?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(repasse: IRepasseBancorbras): Observable<EntityResponseType> {
    return this.http.put<IRepasseBancorbras>(`${this.domain}${this.resourceUrl}/updateBancorbras`, repasse, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.domain}${this.resourceUrl}/deleteBancorbras/${id}`, {observe: 'response'});
  }
}
