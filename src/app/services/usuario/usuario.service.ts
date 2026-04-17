import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../../entities/usuario';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<IUsuario>;
export type EntityArrayResponseType = HttpResponse<IUsuario[]>;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  protected resourceUrl: string;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/usuario');
  }

  create(repasse: IUsuario): Observable<EntityResponseType> {
    return this.http.post<IUsuario>(this.resourceUrl + '/save', repasse, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUsuario>(`${this.resourceUrl}/findById/${id}`, {observe: 'response'});
  }
  
  findAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IUsuario[]>(`${this.resourceUrl}/findAll`, {observe: 'response'});
  }

  update(repasse: IUsuario): Observable<EntityResponseType> {
    return this.http.put<IUsuario>(
      `${this.resourceUrl}/update/${repasse}`,
      repasse,
      {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
