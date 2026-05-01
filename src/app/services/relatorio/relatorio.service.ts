import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { environment } from '../../core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/relatorio');
  }

  relatorioPrestacaoServico(param: string): void {
    this.http.get(`${this.domain}${this.resourceUrl}/prestacaoServico?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  relatorioBancorbras(param: string): void {
    this.http.get(`${this.domain}${this.resourceUrl}/bancorbras?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  relatorioHs(param: string): void {
    this.http.get(`${this.domain}${this.resourceUrl}/hs?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  relatorioContratos(param: string): void {
    this.http.get(`${this.domain}${this.resourceUrl}/contratos?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  relatorioVendedores(param: string): void {
    this.http.get(`${this.domain}${this.resourceUrl}/vendedores?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
