import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { environment } from '../../core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  protected resourceUrl: string;
  protected domain: string | undefined;
  
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor('/api/upload');
  }

  uploadBancorbras(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.domain + this.resourceUrl + '/bancorbras', formData, { responseType: 'text' });
  }

  uploadHs(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.domain + this.resourceUrl + '/hs', formData, { responseType: 'text' });
  }

  uploadPrestacaoServico(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.domain + this.resourceUrl + '/prestacaoServico', formData, { responseType: 'text' });
  }
}
