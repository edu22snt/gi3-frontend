import { Injectable } from '@angular/core';
import { IRepasseBancorbras } from '../../entities/repasse-bancorbras';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';

export type EntityResponseType = HttpResponse<IRepasseBancorbras>;
export type EntityArrayResponseType = HttpResponse<IRepasseBancorbras[]>;

@Injectable({
  providedIn: 'root'
})
export class RepasseBancorbrasService {

  protected resourceUrl: string;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/repasse');
  }

  create(repasse: IRepasseBancorbras): Observable<EntityResponseType> {
    return this.http.post<IRepasseBancorbras>(this.resourceUrl + '/saveBancorbras', repasse, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepasseBancorbras>(`${this.resourceUrl}/repasseBancorbras/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IRepasseBancorbras[]>(`${this.resourceUrl}/findAllBancorbras?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  update(repasse: IRepasseBancorbras): Observable<EntityResponseType> {
    return this.http.put<IRepasseBancorbras>(
      `${this.resourceUrl}/updateBancorbras/${repasse}`,
      repasse,
      {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/deleteBancorbras/${id}`, {observe: 'response'});
  }
}
