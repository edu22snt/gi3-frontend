import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRepasseHs } from '../../entities/repasse-hs';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';

export type EntityResponseType = HttpResponse<IRepasseHs>;
export type EntityArrayResponseType = HttpResponse<IRepasseHs[]>;

@Injectable({
  providedIn: 'root'
})
export class RepasseHsService {

  protected resourceUrl: string;
  
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/repasseServico');
  }
  
  create(repasse: IRepasseHs): Observable<EntityResponseType> {
    return this.http.post<IRepasseHs>(this.resourceUrl + '/saveHs', repasse, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepasseHs>(`${this.resourceUrl}/repasseHs/${id}`, {observe: 'response'});
  }
  
  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IRepasseHs[]>(`${this.resourceUrl}/findAllHs`, {observe: 'response'});
  }

  update(repasse: IRepasseHs): Observable<EntityResponseType> {
    return this.http.put<IRepasseHs>(
      `${this.resourceUrl}/updateHs/${repasse}`,
      repasse,
      {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/deleteHs/${id}`, {observe: 'response'});
  }
}
