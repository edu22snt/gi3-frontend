import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  protected resourceUrl: string;
  
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/upload');
  }

  uploadBancorbras(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.resourceUrl + '/bancorbras', formData, { responseType: 'text' });
  }

  uploadHs(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.resourceUrl + '/hs', formData, { responseType: 'text' });
  }

  uploadPrestacaoServico(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.resourceUrl + '/prestacaoServico', formData, { responseType: 'text' });
  }
}
