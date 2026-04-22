import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  protected resourceUrl: string;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/relatorio');
  }

  relatorioPrestacaoServico(param: string): void {
    this.http.get(`${this.resourceUrl}/prestacaoServico?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);

    });
  }

  relatorioBancorbras(param: string): void {
    this.http.get(`${this.resourceUrl}/bancorbras?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);

    });
  }
}
