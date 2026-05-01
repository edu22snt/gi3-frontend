import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRepasseHs } from '../../entities/repasse-hs';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { environment } from '../../core/environments/environment';

export type EntityResponseType = HttpResponse<IRepasseHs>;
export type EntityArrayResponseType = HttpResponse<IRepasseHs[]>;

@Injectable({
  providedIn: 'root'
})
export class RepasseHsService {
  protected resourceUrl: string;
  protected domain: string | undefined;
  
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/repasse');
  }
  
  create(repasse: IRepasseHs): Observable<EntityResponseType> {
    return this.http.post<IRepasseHs>(this.domain + this.resourceUrl + '/saveHs', repasse, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepasseHs>(`${this.domain}${this.resourceUrl}/repasseHs/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IRepasseHs[]>(`${this.domain}${this.resourceUrl}/findAllHs?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IRepasseHs[]>(
      `${this.domain}${this.resourceUrl}/searchByKeywordHs?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(repasse: IRepasseHs): Observable<EntityResponseType> {
    return this.http.put<IRepasseHs>(`${this.domain}${this.resourceUrl}/updateHs`, repasse, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.domain}${this.resourceUrl}/deleteHs/${id}`, {observe: 'response'});
  }
}
